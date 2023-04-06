import { useEffect } from 'react';
import { authDataState } from 'state/authDataAtom';
import { clusterState } from 'state/clusterAtom';
import jsyaml from 'js-yaml';
import { atom, RecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
  permissionSetsSelector,
  PermissionSetState,
} from './permissionSetsSelector';
import { useUrl } from 'hooks/useUrl';
import { ConfigMapResponse, getConfigMaps } from './utils/getConfigMaps';
import { getFetchFn } from './utils/getFetchFn';
import { JSONSchema4 } from 'json-schema';
import { FetchFn } from 'shared/hooks/BackendAPI/useFetch';

type Rule = {
  uniqueName: string;
  messageOnFailure?: string;
  documentationUrl?: string;
  category?: string;
  policies?: ValidationPolicy[];
  schema: JSONSchema4;
};

type ValidationConfig = {
  rules?: Array<Rule>;
  policies?: Array<ValidationPolicy>;
};

export type ValidationSchema = {
  rules: Array<Rule>;
  policies: Array<ValidationPolicy>;
};

export const emptyValidationSchema: ValidationSchema = {
  rules: [],
  policies: [],
};

type RuleReference =
  | string
  | {
      identifier: string;
    };

type ValidationPolicy = {
  name: string;
  enabled: boolean;
  rules: Array<RuleReference>;
};

const fetchBaseValidationConfig = async (): Promise<ValidationConfig[]> => {
  try {
    const response = await fetch(`/resource-validation/rule-set.yaml`);
    const text = await response.text();
    return jsyaml.loadAll(text) as ValidationConfig[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const loadYamlValues = (
  configMaps: ConfigMapResponse[] | null,
): ValidationConfig[] => {
  return (configMaps
    ?.flatMap(configMap => Object.values(configMap.data))
    .flatMap(schemaText => jsyaml.loadAll(schemaText)) ??
    []) as ValidationConfig[];
};

const fetchConfigMapValidationConfigs = async (
  fetchFn: FetchFn | undefined,
  kubeconfigNamespace = 'kube-public',
  namespace: string,
  permissionSet: PermissionSetState,
): Promise<ValidationConfig[]> => {
  const configMaps = await getConfigMaps(
    fetchFn,
    kubeconfigNamespace,
    namespace,
    permissionSet,
    `busola.io/resource-validation=rule-set`,
  );

  const configFromConfigMap = loadYamlValues(configMaps) as Array<
    ValidationConfig
  >;
  return configFromConfigMap;
};

const fetchValidationConfig = async (
  fetchFn: FetchFn | undefined,
  kubeconfigNamespace = 'kube-public',
  namespace: string,
  permissionSet: PermissionSetState,
) => {
  const validationConfig = await fetchBaseValidationConfig();
  const configFromConfigMap = await fetchConfigMapValidationConfigs(
    fetchFn,
    kubeconfigNamespace,
    namespace,
    permissionSet,
  );

  const rules = [...validationConfig, ...configFromConfigMap].flatMap(
    schema => schema.rules ?? [],
  );

  const policies = [...validationConfig, ...configFromConfigMap].flatMap(
    schema => schema.policies ?? [],
  );

  return { rules, policies };
};

export const getEnabledRules = (
  rules: Rule[],
  policies: ValidationPolicy[],
) => {
  const rulesByName = rules.reduce(
    (agg, rule) => ({ ...agg, [rule.uniqueName]: rule }),
    {},
  ) as { [key: string]: Rule };

  const enabledRulesByName = policies.reduce((agg, policy) => {
    policy.rules.forEach(rule => {
      const key = typeof rule === 'string' ? rule : rule.identifier;
      if (key) {
        if (agg[key]) {
          agg[key].policies?.push(policy);
        } else {
          agg[key] = {
            ...rulesByName[key],
            policies: [policy],
          };
        }
      }
    });
    return agg;
  }, {} as { [key: string]: Rule });

  const enabledRules = Object.values(enabledRulesByName);

  return enabledRules;
};

export const useGetValidationSchemas = async () => {
  const setSchemas = useSetRecoilState(validationSchemasState);
  const fetchFn = getFetchFn(useRecoilValue);
  const cluster = useRecoilValue(clusterState);
  const auth = useRecoilValue(authDataState);
  const permissionSet = useRecoilValue(permissionSetsSelector);
  const { namespace } = useUrl();

  useEffect(() => {
    const setValidationSchema = async () => {
      if (!cluster) {
        setSchemas(emptyValidationSchema);
      } else {
        const { rules, policies } = await fetchValidationConfig(
          fetchFn,
          cluster.currentContext.namespace,
          namespace,
          permissionSet,
        );

        setSchemas({
          rules,
          policies,
        });
      }
    };
    setValidationSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cluster, auth, permissionSet, namespace]);
};

export const validationSchemasState: RecoilState<ValidationSchema | null> = atom<ValidationSchema | null>(
  {
    key: 'validationSchemasState',
    default: emptyValidationSchema,
  },
);
