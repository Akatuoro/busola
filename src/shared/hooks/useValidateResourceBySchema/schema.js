//  This file contains parts from the project datreeio https://github.com/datreeio/datree/blob/main/pkg/defaultRules/defaultRules.yaml  available under Appache License 2.0
//  Copyright (c)  Original author(s) @ https://github.com/datreeio/datree Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to you under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.  Modifications Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.

export const schema = {
  apiVersion: 'v1',
  aliases: [
    {
      properties: {
        kind: {
          enum: [
            'Deployment',
            'Pod',
            'DaemonSet',
            'StatefulSet',
            'ReplicaSet',
            'CronJob',
            'Job',
          ],
        },
      },
    },
  ],
  rules: [
    {
      id: 1,
      name: 'Ensure each container image has a pinned (tag) version',
      uniqueName: 'CONTAINERS_MISSING_IMAGE_VALUE_VERSION',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/ensure-image-pinned-version',
      messageOnFailure:
        'Incorrect value for key `image` - specify an image version to avoid unpleasant "version surprises" in the future',
      category: 'Containers',
      schema: {
        definitions: {
          imageValuePattern: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      type: 'array',
                      items: {
                        properties: {
                          image: {
                            pattern: '\\@sha.*|:(\\w|\\.|\\-)+$',
                            not: {
                              pattern: '.*:(latest|LATEST)$',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/imageValuePattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 2,
      name: 'Ensure each container has a configured memory request',
      uniqueName: 'CONTAINERS_MISSING_MEMORY_REQUEST_KEY',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/ensure-memory-request',
      messageOnFailure:
        'Missing property object `requests.memory` - value should be within the accepted boundaries recommended by the organization',
      category: 'Containers',
      schema: {
        definitions: {
          memoryRequestPattern: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      type: 'array',
                      items: {
                        properties: {
                          resources: {
                            properties: {
                              requests: {
                                type: 'object',
                                properties: {
                                  memory: {
                                    type: ['string', 'number'],
                                  },
                                },
                                required: ['memory'],
                              },
                            },
                            required: ['requests'],
                          },
                        },
                        required: ['resources'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/memoryRequestPattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 3,
      name: 'Ensure each container has a configured CPU request',
      uniqueName: 'CONTAINERS_MISSING_CPU_REQUEST_KEY',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/ensure-cpu-request',
      messageOnFailure:
        'Missing property object `requests.cpu` - value should be within the accepted boundaries recommended by the organization',
      category: 'Containers',
      schema: {
        definitions: {
          cpuRequestPattern: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      type: 'array',
                      items: {
                        properties: {
                          resources: {
                            properties: {
                              requests: {
                                type: 'object',
                                properties: {
                                  cpu: {
                                    type: ['string', 'number'],
                                  },
                                },
                                required: ['cpu'],
                              },
                            },
                            required: ['requests'],
                          },
                        },
                        required: ['resources'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/cpuRequestPattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 4,
      name: 'Ensure each container has a configured memory limit',
      uniqueName: 'CONTAINERS_MISSING_MEMORY_LIMIT_KEY',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/ensure-memory-limit',
      messageOnFailure:
        'Missing property object `limits.memory` - value should be within the accepted boundaries recommended by the organization',
      category: 'Containers',
      schema: {
        definitions: {
          memoryLimitPattern: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      type: 'array',
                      items: {
                        properties: {
                          resources: {
                            properties: {
                              limits: {
                                type: 'object',
                                properties: {
                                  memory: {
                                    type: ['string', 'number'],
                                  },
                                },
                                required: ['memory'],
                              },
                            },
                            required: ['limits'],
                          },
                        },
                        required: ['resources'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/memoryLimitPattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 5,
      name: 'Ensure each container has a configured CPU limit',
      uniqueName: 'CONTAINERS_MISSING_CPU_LIMIT_KEY',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/ensure-cpu-limit',
      messageOnFailure:
        'Missing property object `limits.cpu` - value should be within the accepted boundaries recommended by the organization',
      category: 'Containers',
      schema: {
        definitions: {
          cpuLimitPattern: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      type: 'array',
                      items: {
                        properties: {
                          resources: {
                            properties: {
                              limits: {
                                type: 'object',
                                properties: {
                                  cpu: {
                                    type: ['string', 'number'],
                                  },
                                },
                                required: ['cpu'],
                              },
                            },
                            required: ['limits'],
                          },
                        },
                        required: ['resources'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/cpuLimitPattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 6,
      name: 'Prevent Ingress from forwarding all traffic to a single container',
      uniqueName: 'INGRESS_INCORRECT_HOST_VALUE_PERMISSIVE',
      enabledByDefault: true,
      documentationUrl:
        'https://hub.datree.io/prevent-ingress-forwarding-traffic-to-single-container',
      messageOnFailure:
        'Incorrect value for key `host` - specify host instead of using a wildcard character ("*")',
      category: 'Networking',
      schema: {
        if: { properties: { kind: { enum: ['Ingress'] } } },
        then: {
          properties: {
            spec: {
              properties: {
                rules: {
                  type: 'array',
                  items: {
                    properties: {
                      host: {
                        type: 'string',
                        not: { enum: ['*'] },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 7,
      name: 'Prevent Service from exposing node port',
      uniqueName: 'SERVICE_INCORRECT_TYPE_VALUE_NODEPORT',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/prevent-node-port',
      messageOnFailure:
        'Incorrect value for key `type` - `NodePort` will open a port on all nodes where it can be reached by the network external to the cluster',
      category: 'Networking',
      schema: {
        if: { properties: { kind: { enum: ['Service'] } } },
        then: {
          properties: {
            spec: {
              properties: {
                type: {
                  type: 'string',
                  not: { enum: ['NodePort'] },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 8,
      name: 'Ensure CronJob scheduler is valid',
      uniqueName: 'CRONJOB_INVALID_SCHEDULE_VALUE',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/ensure-cronjob-scheduler-valid',
      messageOnFailure:
        'Incorrect value for key `schedule` - the (cron) schedule expressions is not valid and, therefore, will not work as expected',
      category: 'CronJob',
      schema: {
        if: { properties: { kind: { enum: ['CronJob'] } } },
        then: {
          properties: {
            spec: {
              properties: {
                schedule: {
                  pattern:
                    '(^((\\*\\/)?([0-5]?[0-9])((\\,|\\-|\\/)([0-5]?[0-9]))*|\\*)\\s+((\\*\\/)?((2[0-3]|1[0-9]|[0-9]|00))((\\,|\\-|\\/)(2[0-3]|1[0-9]|[0-9]|00))*|\\*)\\s+((\\*\\/)?([1-9]|[12][0-9]|3[01])((\\,|\\-|\\/)([1-9]|[12][0-9]|3[01]))*|\\*)\\s+((\\*\\/)?([1-9]|1[0-2])((\\,|\\-|\\/)([1-9]|1[0-2]))*|\\*|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|des))\\s+((\\*\\/)?[0-6]((\\,|\\-|\\/)[0-6])*|\\*|00|(sun|mon|tue|wed|thu|fri|sat))\\s*$)|@(annually|yearly|monthly|weekly|daily|hourly|reboot)',
                },
              },
            },
          },
        },
      },
    },
    {
      id: 9,
      name: 'Ensure workload has valid label values',
      uniqueName: 'WORKLOAD_INVALID_LABELS_VALUE',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/ensure-labels-value-valid',
      messageOnFailure:
        'Incorrect value for key(s) under `labels` - the vales syntax is not valid so the Kubernetes engine will not accept it',
      category: 'Workload',
      schema: {
        if: {
          properties: {
            kind: {
              enum: [
                'Deployment',
                'Pod',
                'DaemonSet',
                'StatefulSet',
                'ReplicaSet',
                'CronJob',
                'Job',
              ],
            },
          },
        },
        then: {
          properties: {
            metadata: {
              properties: {
                labels: {
                  patternProperties: { '^.*$': { format: 'hostname' } },
                  additionalProperties: false,
                },
              },
            },
          },
        },
      },
    },
    {
      id: 10,
      name: 'Ensure deployment-like resource is using a valid restart policy',
      uniqueName: 'WORKLOAD_INCORRECT_RESTARTPOLICY_VALUE_ALWAYS',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/ensure-valid-restart-policy',
      messageOnFailure:
        'Incorrect value for key `restartPolicy` - any other value than `Always` is not supported by this resource',
      category: 'Workload',
      schema: {
        if: {
          properties: {
            kind: {
              enum: [
                'Deployment',
                'ReplicaSet',
                'DaemonSet',
                'ReplicationController',
              ],
            },
          },
        },
        then: {
          properties: {
            spec: {
              properties: {
                template: {
                  properties: {
                    spec: {
                      properties: {
                        restartPolicy: { enum: ['Always'] },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 11,
      name: 'Ensure each container has a configured liveness probe',
      uniqueName: 'CONTAINERS_MISSING_LIVENESSPROBE_KEY',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/ensure-liveness-probe',
      messageOnFailure:
        'Missing property object `livenessProbe` - add a properly configured livenessProbe to catch possible deadlocks',
      category: 'Containers',
      schema: {
        definitions: {
          specContainers: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      items: { required: ['livenessProbe'] },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/specContainers' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 12,
      name: 'Ensure each container has a configured readiness probe',
      uniqueName: 'CONTAINERS_MISSING_READINESSPROBE_KEY',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/ensure-readiness-probe',
      messageOnFailure:
        'Missing property object `readinessProbe` - add a properly configured readinessProbe to notify kubelet your Pods are ready for traffic',
      category: 'Containers',
      schema: {
        definitions: {
          specContainers: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      items: { required: ['readinessProbe'] },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/specContainers' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 13,
      name: 'Ensure HPA has minimum replicas configured',
      uniqueName: 'HPA_MISSING_MINREPLICAS_KEY',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/ensure-hpa-minimum-replicas',
      messageOnFailure:
        'Missing property object `minReplicas` - the value should be within the accepted boundaries recommended by the organization',
      category: 'Other',
      schema: {
        if: {
          properties: { kind: { enum: ['HorizontalPodAutoscaler'] } },
        },
        then: { properties: { spec: { required: ['minReplicas'] } } },
      },
    },
    {
      id: 14,
      name: 'Ensure HPA has maximum replicas configured',
      uniqueName: 'HPA_MISSING_MAXREPLICAS_KEY',
      enabledByDefault: false,
      documentationUrl: 'https://hub.datree.io/ensure-hpa-maximum-replicas',
      messageOnFailure:
        'Missing property object `maxReplicas` - the value should be within the accepted boundaries recommended by the organization',
      category: 'Other',
      schema: {
        if: {
          properties: { kind: { enum: ['HorizontalPodAutoscaler'] } },
        },
        then: { properties: { spec: { required: ['maxReplicas'] } } },
      },
    },
    {
      id: 15,
      name: 'Prevent workload from using the default namespace',
      uniqueName: 'WORKLOAD_INCORRECT_NAMESPACE_VALUE_DEFAULT',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/prevent-deafult-namespce',
      messageOnFailure:
        'Incorrect value for key `namespace` - use an explicit namespace instead of the default one (`default`)',
      category: 'Workload',
      schema: {
        if: {
          properties: {
            kind: {
              enum: [
                'Deployment',
                'Pod',
                'DaemonSet',
                'StatefulSet',
                'ReplicaSet',
                'CronJob',
                'Job',
              ],
            },
          },
        },
        then: {
          properties: {
            metadata: {
              properties: { namespace: { not: { enum: ['default'] } } },
            },
          },
        },
      },
    },
    {
      id: 16,
      name: 'Ensure Deployment has more than one replica configured',
      uniqueName: 'DEPLOYMENT_INCORRECT_REPLICAS_VALUE',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/ensure-minimum-two-replicas',
      messageOnFailure:
        'Incorrect value for key `replicas` - running 2 or more replicas will increase the availability of the service',
      category: 'Workload',
      schema: {
        if: { properties: { kind: { enum: ['Deployment'] } } },
        then: {
          properties: {
            spec: { properties: { replicas: { minimum: 2 } } },
          },
        },
      },
    },
    {
      id: 17,
      name: 'Ensure CronJob has a configured deadline',
      uniqueName: 'CRONJOB_MISSING_STARTINGDEADLINESECOND_KEY',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/ensure-cronjob-deadline',
      messageOnFailure:
        'Missing property object `startingDeadlineSeconds` - set a time limit to the cron execution to allow killing it if exceeded',
      category: 'CronJob',
      schema: {
        if: { properties: { kind: { enum: ['CronJob'] } } },
        then: {
          properties: {
            spec: {
              properties: { startingDeadlineSeconds: { type: 'number' } },
              required: ['startingDeadlineSeconds'],
            },
          },
        },
      },
    },
    {
      id: 18,
      name: 'Prevent deprecated APIs in Kubernetes v1.16',
      uniqueName: 'K8S_DEPRECATED_APIVERSION_1.16',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/prevent-deprecated-k8s-api-116',
      messageOnFailure:
        'Incorrect value for key `apiVersion` - the version you are trying to use is not supported by the Kubernetes cluster version (>=1.16)',
      category: 'Deprecation',
      schema: {
        properties: {
          apiVersion: {
            type: 'string',
            not: {
              enum: ['extensions/v1beta1', 'apps/v1beta1', 'apps/v1beta2'],
            },
          },
        },
      },
    },
    {
      id: 19,
      name: 'Prevent deprecated APIs in Kubernetes v1.17',
      uniqueName: 'K8S_DEPRECATED_APIVERSION_1.17',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/prevent-deprecated-k8s-api-117',
      messageOnFailure:
        'Incorrect value for key `apiVersion` - the version you are trying to use is not supported by the Kubernetes cluster version (>=1.17)',
      category: 'Deprecation',
      schema: {
        properties: {
          apiVersion: {
            type: 'string',
            not: {
              enum: [
                'kubeadm.k8s.io/v1beta1',
                'rbac.authorization.k8s.io/v1alpha1',
                'rbac.authorization.k8s.io/v1beta1',
              ],
            },
          },
        },
      },
    },
    {
      id: 20,
      name: 'Prevent containers from having root access capabilities',
      uniqueName: 'CONTAINERS_INCORRECT_PRIVILEGED_VALUE_TRUE',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/prevent-privileged-containers',
      messageOnFailure:
        'Incorrect value for key `privileged` - this mode will allow the container the same access as processes running on the host',
      category: 'Containers',
      schema: {
        definitions: {
          specContainers: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      type: 'array',
                      items: {
                        properties: {
                          securityContext: {
                            properties: {
                              privileged: {
                                not: {
                                  enum: [true, 'true'],
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/specContainers' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 21,
      name: 'Ensure workload has a configured `owner` label',
      uniqueName: 'WORKLOAD_MISSING_LABEL_OWNER_VALUE',
      enabledByDefault: false,
      documentationUrl: 'https://hub.datree.io/ensure-owner-label',
      messageOnFailure:
        'Missing label object `owner` - add a proper owner label to know which person/team to ping when needed',
      category: 'Workload',
      schema: {
        if: {
          properties: {
            kind: {
              enum: [
                'Deployment',
                'Pod',
                'DaemonSet',
                'StatefulSet',
                'ReplicaSet',
                'CronJob',
                'Job',
              ],
            },
          },
        },
        then: {
          properties: {
            metadata: { properties: { labels: { required: ['owner'] } } },
          },
        },
      },
    },
    {
      id: 22,
      name: 'Ensure Deployment has a configured `env` label',
      uniqueName: 'DEPLOYMENT_MISSING_LABEL_ENV_VALUE',
      enabledByDefault: false,
      documentationUrl: 'https://hub.datree.io/ensure-env-label',
      messageOnFailure:
        'Missing label object `env` - add a proper environment description (e.g. "prod", "testing", etc.) to the Deployment config',
      category: 'Workload',
      schema: {
        if: { properties: { kind: { enum: ['Deployment'] } } },
        then: {
          properties: {
            metadata: {
              properties: { labels: { required: ['env'] } },
              required: ['labels'],
            },
          },
          required: ['metadata'],
        },
      },
    },
    {
      id: 23,
      name: 'Ensure each container image has a digest tag',
      uniqueName: 'CONTAINERS_MISSING_IMAGE_VALUE_DIGEST',
      enabledByDefault: false,
      documentationUrl: 'https://hub.datree.io/ensure-digest-tag',
      messageOnFailure:
        'Incorrect value for key `image` - add a digest tag (starts with `@sha256:`) to represent an immutable version of the image',
      category: 'Containers',
      schema: {
        definitions: {
          imageValuePattern: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      type: 'array',
                      items: {
                        properties: {
                          image: {
                            pattern: '.*\\@sha256\\:\\S{64}$',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/imageValuePattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 24,
      name: 'Prevent CronJob from executing jobs concurrently',
      uniqueName: 'CRONJOB_MISSING_CONCURRENCYPOLICY_KEY',
      enabledByDefault: true,
      documentationUrl: 'https://hub.datree.io/prevent-cronjob-concurrency',
      messageOnFailure:
        "Missing property object `concurrencyPolicy` - the behavior will be more deterministic if jobs won't run concurrently",
      category: 'CronJob',
      schema: {
        if: { properties: { kind: { enum: ['CronJob'] } } },
        then: {
          properties: {
            spec: {
              properties: {
                concurrencyPolicy: { enum: ['Forbid', 'Replace'] },
              },
              required: ['concurrencyPolicy'],
            },
          },
        },
      },
    },
    {
      id: 25,
      name: 'Prevent deploying naked pods',
      uniqueName: 'K8S_INCORRECT_KIND_VALUE_POD',
      enabledByDefault: false,
      documentationUrl: 'https://hub.datree.io/prevent-naked-pods',
      messageOnFailure:
        "Incorrect value for key `kind` - raw pod won't be rescheduled in the event of a node failure",
      category: 'Other',
      schema: {
        properties: { kind: { type: 'string', not: { enum: ['Pod'] } } },
      },
    },
    {
      id: 26,
      name: "Prevent containers from sharing the host's PID namespace",
      uniqueName: 'CONTAINERS_INCORRECT_HOSTPID_VALUE_TRUE',
      enabledByDefault: false,
      documentationUrl: 'https://hub.datree.io/prevent-using-host-pid',
      messageOnFailure:
        "Incorrect value for key `hostPID` - running on the host's PID namespace enables access to sensitive information from processes running outside the container",
      category: 'Containers',
      schema: {
        definitions: {
          specContainers: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    hostPID: { not: { enum: [true, 'true'] } },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/specContainers' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 27,
      name: 'Prevent containers from sharing the host`s IPC namespace',
      uniqueName: 'CONTAINERS_INCORRECT_HOSTIPC_VALUE_TRUE',
      enabledByDefault: false,
      documentationUrl: 'https://hub.datree.io/prevent-using-host-ipc',
      messageOnFailure:
        'Incorrect value for key `hostIPC` - running on the host`s IPC namespace can be (maliciously) used to interact with other processes running outside the container',
      category: 'Containers',
      schema: {
        definitions: {
          specContainers: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    hostIPC: { not: { enum: [true, 'true'] } },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/specContainers' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 28,
      name: "Prevent containers from sharing the host's network namespace",
      uniqueName: 'CONTAINERS_INCORRECT_HOSTNETWORK_VALUE_TRUE',
      enabledByDefault: false,
      documentationUrl: 'https://hub.datree.io/prevent-using-host-network',
      messageOnFailure:
        "Incorrect value for key `hostNetwork` - running on the host's network namespace can allow a compromised container to sniff network traffic",
      category: 'Containers',
      schema: {
        definitions: {
          specContainers: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    hostNetwork: { not: { enum: [true, 'true'] } },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/specContainers' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 29,
      name: 'Prevent containers from accessing host files by using high UIDs',
      uniqueName: 'CONTAINERS_INCORRECT_RUNASUSER_VALUE_LOWUID',
      enabledByDefault: false,
      documentationUrl: 'https://hub.datree.io/prevent-uid-conflicts',
      messageOnFailure:
        'Incorrect value for key `runAsUser` - value should be above 9999 to reduce the likelihood that the UID is already taken',
      category: 'Containers',
      schema: {
        definitions: {
          specContainers: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      type: 'array',
                      items: {
                        properties: {
                          securityContext: {
                            properties: {
                              runAsUser: { minimum: 10000 },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/specContainers' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 30,
      name: 'Prevent containers from mounting Docker socket',
      uniqueName: 'CONTAINERS_INCORRECT_PATH_VALUE_DOCKERSOCKET',
      enabledByDefault: false,
      documentationUrl: 'https://hub.datree.io/prevent-mounting-docker-socket',
      messageOnFailure:
        'Incorrect value for key `path` - avoid mounting the docker.socket becasue it can allow container breakout',
      category: 'Containers',
      schema: {
        definitions: {
          specContainers: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      type: 'array',
                      items: {
                        properties: {
                          volumeMounts: {
                            type: 'array',
                            items: {
                              properties: {
                                mountPath: {
                                  not: {
                                    enum: ['/var/run/docker.sock'],
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          specVolumes: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    volumes: {
                      type: 'array',
                      items: {
                        properties: {
                          hostPath: {
                            properties: {
                              path: {
                                not: {
                                  enum: ['/var/run/docker.sock'],
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [
          { $ref: '#/definitions/specContainers' },
          { $ref: '#/definitions/specVolumes' },
        ],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 31,
      name: 'Prevent ConfigMap security vulnerability (CVE-2021-25742)',
      uniqueName: 'CONFIGMAP_CVE2021_25742_INCORRECT_SNIPPET_ANNOTATIONS_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-configmap-security-vulnerability-cve-2021-25742',
      messageOnFailure:
        'Missing property object `allow-snippet-annotations` - set it to "false" to override default behaviour',
      category: 'Security',
      schema: {
        if: {
          properties: {
            kind: { enum: ['ConfigMap'] },
            metadata: {
              anyOf: [
                {
                  properties: {
                    name: {
                      enum: [
                        'nginx-config',
                        'nginx-conf',
                        'ingress-nginx-controller',
                      ],
                    },
                  },
                  required: ['name'],
                },
                {
                  properties: {
                    namespace: {
                      enum: ['ingress-nginx', 'nginx-ingress'],
                    },
                  },
                  required: ['namespace'],
                },
              ],
            },
          },
        },
        then: {
          properties: {
            data: {
              properties: {
                'allow-snippet-annotations': { enum: ['false'] },
              },
              required: ['allow-snippet-annotations'],
            },
          },
          required: ['data'],
        },
      },
    },
    {
      id: 32,
      name: 'Prevent Ingress security vulnerability (CVE-2021-25742)',
      uniqueName: 'INGRESS_CVE2021_25742_INCORRECT_SERVER_SNIPPET_KEY',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-ingress-security-vulnerability-cve-2021-25742',
      messageOnFailure:
        'Forbidden property object `server-snippet` - ingress-nginx custom snippets are not allowed',
      category: 'Security',
      schema: {
        if: { properties: { kind: { enum: ['Ingress'] } } },
        then: {
          properties: {
            metadata: {
              properties: {
                annotations: {
                  not: {
                    propertyNames: { pattern: '^.*server-snippet$' },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 33,
      name: 'Prevent container security vulnerability (CVE-2021-25741)',
      uniqueName: 'CONTAINER_CVE2021_25741_INCORRECT_SUBPATH_KEY',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-container-security-vulnerability-cve-2021-25741',
      messageOnFailure:
        'Forbidden property object `subPath` - malicious users can gain access to files & directories outside of the volume',
      category: 'Security',
      schema: {
        definitions: {
          subPathPattern: {
            properties: {
              spec: {
                properties: {
                  containers: {
                    type: 'array',
                    items: {
                      properties: {
                        volumeMounts: {
                          type: 'array',
                          items: {
                            propertyNames: {
                              not: {
                                pattern: '^subPath$',
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/subPathPattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 34,
      name: 'Prevent EndpointSlice security vulnerability (CVE-2021-25737)',
      uniqueName: 'ENDPOINTSLICE_CVE2021_25373_INCORRECT_ADDRESSES_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-endpointslice-validation-from-enabling-host-network-hijack-cve-2021-25737',
      messageOnFailure:
        'Incorrect value for key `addresses` - IP address is within vulnerable ranges (127.0.0.0/8 and 169.254.0.0/16)',
      category: 'Security',
      schema: {
        if: { properties: { kind: { enum: ['EndpointSlice'] } } },
        then: {
          properties: {
            endpoints: {
              type: 'array',
              items: {
                properties: {
                  addresses: {
                    type: 'array',
                    items: {
                      not: {
                        anyOf: [
                          {
                            pattern: '^(169\\.254\\.)',
                          },
                          { pattern: '^(127\\.)' },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 35,
      name: 'Ensure Workflow DAG fail-fast on node failure',
      uniqueName: 'ARGO_WORKFLOW_INCORRECT_FAILFAST_VALUE_FALSE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-workflow-dag-fail-fast-on-node-failure',
      messageOnFailure:
        'Incorrect value for key `failFast` - value should be `true` to prevent DAG from running on all branches, regardless of the failed outcomes of the DAG branches',
      category: 'Argo',
      schema: {
        if: {
          properties: {
            kind: { enum: ['Workflow'] },
            spec: {
              properties: {
                templates: {
                  type: 'array',
                  items: {
                    properties: {
                      dag: {
                        properties: {
                          failFast: { required: ['failFast'] },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        then: {
          properties: {
            spec: {
              properties: {
                templates: {
                  type: 'array',
                  items: {
                    properties: {
                      dag: {
                        properties: { failFast: { const: true } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 36,
      name: 'Prevent Workflow pods from using the default service account',
      uniqueName: 'ARGO_WORKFLOW_INCORRECT_SERVICE_ACCOUNT_NAME_VALUE_DEFAULT',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-workflow-pods-from-using-the-default-service-account',
      messageOnFailure:
        'Incorrect value for key `serviceAccountName` - when set to `default` container is exposed to possible attacks',
      category: 'Argo',
      schema: {
        if: {
          properties: { kind: { enum: ['WorkflowTemplate', 'Workflow'] } },
        },
        then: {
          properties: {
            spec: {
              properties: {
                serviceAccountName: {
                  type: 'string',
                  not: { const: 'default' },
                },
              },
              required: ['serviceAccountName'],
            },
          },
        },
      },
    },
    {
      id: 37,
      name: 'Ensure ConfigMap is recognized by ArgoCD',
      uniqueName: 'ARGO_CONFIGMAP_MISSING_PART_OF_LABEL_VALUE_ARGOCD',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-configmap-is-recognized-by-argocd',
      messageOnFailure:
        "Incorrect value for annotation `app.kubernetes.io/part-of` - value should be `argocd`, or ArgoCD won't recognize this resource",
      category: 'Argo',
      schema: {
        if: {
          properties: {
            kind: { enum: ['ConfigMap'] },
            metadata: {
              properties: {
                name: {
                  enum: [
                    'argocd-tls-certs-cm',
                    'argocd-rbac-cm',
                    'argocd-ssh-known-hosts-cm',
                    'argocd-cmd-params-cm',
                    'argocd-cm',
                  ],
                },
              },
            },
          },
        },
        then: {
          properties: {
            metadata: {
              properties: {
                labels: {
                  properties: {
                    'app.kubernetes.io/part-of': {
                      type: 'string',
                      const: 'argocd',
                    },
                  },
                  required: ['app.kubernetes.io/part-of'],
                },
              },
            },
          },
        },
      },
    },
    {
      id: 38,
      name: 'Ensure Rollout pause step has a configured duration',
      uniqueName: 'ARGO_ROLLOUT_MISSING_PAUSE_DURATION',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-rollout-pause-step-has-a-configured-duration',
      messageOnFailure:
        'Missing the key `duration` - prevent the rollout from waiting indefinitely for the pause condition',
      category: 'Argo',
      schema: {
        if: { properties: { kind: { enum: ['Rollout'] } } },
        then: {
          properties: {
            spec: {
              properties: {
                strategy: {
                  properties: {
                    canary: {
                      type: 'object',
                      properties: {
                        steps: {
                          type: 'array',
                          items: {
                            properties: {
                              pause: {
                                type: 'object',
                                properties: {
                                  duration: {
                                    type: 'string',
                                  },
                                },
                                required: ['duration'],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 39,
      name:
        'Ensure Application and AppProject are part of the argocd namespace',
      uniqueName: 'ARGO_APP_PROJECT_INCORRECT_NAMESPACE_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-application-and-appproject-are-part-of-the-argocd-namespace',
      messageOnFailure:
        'Incorrect value for property `namespace` - Application and AppProject have to be installed on the argocd namespace',
      category: 'Argo',
      schema: {
        if: {
          properties: { kind: { enum: ['Application', 'AppProject'] } },
        },
        then: {
          properties: {
            metadata: {
              properties: {
                namespace: { type: 'string', const: 'argocd' },
              },
              required: ['namespace'],
            },
          },
        },
      },
    },
    {
      id: 40,
      name: 'Prevent Workflow from having an empty retry strategy',
      uniqueName: 'ARGO_WORKFLOW_INCORRECT_RETRY_STRATEGY_VALUE_EMPTY',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-workflow-from-having-an-empty-retry-strategy',
      messageOnFailure:
        'Incorrect value for key `retryStrategy` - empty value (`{}`) can cause failed/errored steps to keep retrying, which can result in OOM issues',
      category: 'Argo',
      schema: {
        if: { properties: { kind: { enum: ['Workflow'] } } },
        then: {
          properties: {
            spec: {
              properties: {
                templates: {
                  items: {
                    properties: {
                      retryStrategy: {
                        type: 'object',
                        minProperties: 1,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 41,
      name: 'Ensure Rollout has revision history set',
      uniqueName: 'ARGO_WORKFLOW_INCORRECT_REVISION_HISTORY_LIMIT_VALUE_0',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-rollout-has-revision-history-set',
      messageOnFailure:
        'Incorrect value for key `revisionHistoryLimit` - value above 0 is required to enable rolling back from a failed deployment',
      category: 'Argo',
      schema: {
        if: { properties: { kind: { enum: ['Rollout'] } } },
        then: {
          properties: {
            spec: {
              properties: { revisionHistoryLimit: { minimum: 1 } },
              required: ['revisionHistoryLimit'],
            },
          },
        },
      },
    },
    {
      id: 42,
      name: 'Ensure Rollout allows broadcasting IP table changes',
      uniqueName: 'ARGO_ROLLOUT_INCORRECT_SCALE_DOWN_DELAY_VALUE_BELOW_30',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-rollout-allows-broadcasting-ip-table-changes',
      messageOnFailure:
        'Incorrect value for key `scaleDownDelaySeconds` - value should be at least 30 to prevent packets from being sent to a node that killed the pod',
      category: 'Argo',
      schema: {
        if: { properties: { kind: { enum: ['Rollout'] } } },
        then: {
          properties: {
            spec: {
              properties: {
                strategy: {
                  properties: {
                    blueGreen: {
                      type: 'object',
                      properties: {
                        scaleDownDelaySeconds: {
                          type: 'integer',
                          minimum: 30,
                        },
                      },
                      required: ['scaleDownDelaySeconds'],
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 43,
      name: 'Ensure Rollout that is marked as degraded scales down ReplicaSet',
      uniqueName: 'ARGO_ROLLOUT_INCORRECT_PROGRESS_DEADLINE_ABORT_VALUE_FALSE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-rollout-that-is-marked-as-degraded-scales-down-replicaset',
      messageOnFailure:
        'Incorrect value for key `progressDeadlineAbort` - value should be `true` to prevent the rollout pod from retrying indefinitely',
      category: 'Argo',
      schema: {
        if: {
          properties: {
            kind: { enum: ['Rollout'] },
            spec: {
              properties: {
                allOf: {
                  properties: {
                    progressDeadlineSeconds: { type: 'integer' },
                  },
                },
              },
            },
          },
        },
        then: {
          properties: {
            spec: {
              properties: { progressDeadlineAbort: { const: true } },
              required: ['progressDeadlineAbort'],
            },
          },
        },
      },
    },
    {
      id: 44,
      name: 'Ensure Workflow retry policy catches relevant errors only',
      uniqueName:
        'ARGO_WORKFLOW_ENSURE_RETRY_ON_BOTH_ERROR_AND_TRANSIENT_ERROR',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-workflow-retry-policy-catches-relevant-errors-only',
      messageOnFailure:
        'Incorrect value for key `retryPolicy` - the expression should include retry on steps that failed either on transient or Argo controller errors',
      category: 'Argo',
      schema: {
        if: {
          allOf: [
            { properties: { kind: { enum: ['Workflow'] } } },
            {
              properties: {
                spec: {
                  properties: {
                    templates: {
                      type: 'array',
                      contains: {
                        properties: {
                          retryStrategy: {
                            properties: {
                              retryPolicy: { const: 'Always' },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
        then: {
          properties: {
            spec: {
              properties: {
                templates: {
                  type: 'array',
                  contains: {
                    properties: {
                      retryStrategy: {
                        properties: {
                          retryPolicy: { const: 'Always' },
                          expression: {
                            const:
                              'lastRetry.status == "Error" or (lastRetry.status == "Failed" and asInt(lastRetry.exitCode) not in [0])',
                          },
                        },
                        required: ['retryPolicy', 'expression'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 45,
      name: 'Ensure each container has a read-only root filesystem',
      uniqueName: 'CONTAINERS_INCORRECT_READONLYROOTFILESYSTEM_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-read-only-filesystem',
      messageOnFailure:
        "Incorrect value for key `readOnlyRootFilesystem` - set to 'true' to protect filesystem from potential attacks",
      category: 'NSA',
      schema: {
        definitions: {
          containerSecurityPattern: {
            properties: {
              spec: {
                properties: {
                  containers: {
                    type: 'array',
                    items: {
                      properties: {
                        securityContext: {
                          properties: {
                            readOnlyRootFilesystem: { const: true },
                          },
                          required: ['readOnlyRootFilesystem'],
                        },
                      },
                      required: ['securityContext'],
                    },
                  },
                },
              },
            },
          },
          podSecurityContextPattern: {
            if: { properties: { kind: { enum: ['Pod'] } } },
            then: {
              properties: {
                spec: {
                  properties: {
                    securityContext: {
                      properties: {
                        readOnlyRootFilesystem: { const: true },
                      },
                      required: ['readOnlyRootFilesystem'],
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [
          { $ref: '#/definitions/containerSecurityPattern' },
          { $ref: '#/definitions/podSecurityContextPattern' },
        ],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 46,
      name: 'Prevent containers from accessing underlying host',
      uniqueName: 'CONTAINERS_INCORRECT_KEY_HOSTPATH',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-accessing-underlying-host',
      messageOnFailure:
        'Invalid key `hostPath` - refrain from using this mount to prevent an attack on the underlying host',
      category: 'NSA',
      schema: {
        definitions: {
          specVolumePattern: {
            properties: {
              spec: {
                properties: {
                  volumes: {
                    type: 'array',
                    items: { not: { required: ['hostPath'] } },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/specVolumePattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 47,
      name: 'Prevent containers from escalating privileges',
      uniqueName: 'CONTAINERS_MISSING_KEY_ALLOWPRIVILEGEESCALATION',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-escalating-privileges',
      messageOnFailure:
        'Missing key `allowPrivilegeEscalation` - set to false to prevent attackers from exploiting escalated container privileges',
      category: 'NSA',
      schema: {
        definitions: {
          specContainerPattern: {
            properties: {
              spec: {
                properties: {
                  containers: {
                    type: 'array',
                    items: {
                      properties: {
                        securityContext: {
                          properties: {
                            allowPrivilegeEscalation: { const: false },
                          },
                          required: ['allowPrivilegeEscalation'],
                        },
                      },
                      required: ['securityContext'],
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/specContainerPattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 48,
      name: 'Prevent containers from allowing command execution',
      uniqueName: 'CONTAINERS_INCORRECT_RESOURCES_VERBS_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-allowing-command-execution',
      messageOnFailure:
        'Incorrect value for key `resources` and/or `verbs` - allowing containers to run the exec command can be exploited by attackers',
      category: 'NSA',
      schema: {
        if: { properties: { kind: { enum: ['Role', 'ClusterRole'] } } },
        then: {
          properties: {
            rules: {
              type: 'array',
              items: {
                properties: {
                  resources: {
                    type: 'array',
                    not: {
                      items: { enum: ['*', 'pods/exec'] },
                    },
                  },
                  verbs: {
                    type: 'array',
                    not: { items: { enum: ['create', '*'] } },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 49,
      name: 'Prevent containers from having insecure capabilities',
      uniqueName: 'CONTAINERS_INVALID_CAPABILITIES_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-insecure-capabilities',
      messageOnFailure:
        'Incorrect value for key `add` - refrain from using insecure capabilities to prevent access to sensitive components',
      category: 'NSA',
      schema: {
        definitions: {
          specContainerPattern: {
            properties: {
              spec: {
                properties: {
                  containers: {
                    type: 'array',
                    items: {
                      properties: {
                        securityContext: {
                          properties: {
                            capabilities: {
                              properties: {
                                add: {
                                  type: 'array',
                                  items: {
                                    not: {
                                      enum: [
                                        'SETPCAP',
                                        'NET_ADMIN',
                                        'NET_RAW',
                                        'SYS_MODULE',
                                        'SYS_RAWIO',
                                        'SYS_PTRACE',
                                        'SYS_ADMIN',
                                        'SYS_BOOT',
                                        'MAC_OVERRIDE',
                                        'MAC_ADMIN',
                                        'PERFMON',
                                        'ALL',
                                        'BPF',
                                      ],
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/specContainerPattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 50,
      name: 'Prevent containers from insecurely exposing workload',
      uniqueName: 'CONTAINERS_INCORRECT_KEY_HOSTPORT',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-insecurely-exposing-workload',
      messageOnFailure:
        'Incorrect key `hostPort` - refrain from using this key to prevent insecurely exposing your workload',
      category: 'NSA',
      schema: {
        definitions: {
          specContainerPattern: {
            properties: {
              spec: {
                properties: {
                  containers: {
                    type: 'array',
                    items: {
                      properties: {
                        ports: {
                          type: 'array',
                          items: {
                            not: {
                              required: ['hostPort'],
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/specContainerPattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 51,
      name: 'Prevent containers from accessing host files by using high GIDs',
      uniqueName: 'CONTAINERS_INCORRECT_RUNASGROUP_VALUE_LOWGID',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-accessing-host-files-by-using-high-gids',
      messageOnFailure:
        'Invalid value for key `runAsGroup` - must be greater than 999 to ensure container is running with non-root group membership',
      category: 'NSA',
      schema: {
        definitions: {
          specContainerPattern: {
            properties: {
              spec: {
                properties: {
                  containers: {
                    type: 'array',
                    items: {
                      properties: {
                        securityContext: {
                          properties: {
                            runAsGroup: { minimum: 1000 },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          podSecurityContextPattern: {
            if: { properties: { kind: { enum: ['Pod'] } } },
            then: {
              properties: {
                spec: {
                  properties: {
                    securityContext: {
                      properties: { runAsGroup: { minimum: 1000 } },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [
          { $ref: '#/definitions/specContainerPattern' },
          { $ref: '#/definitions/podSecurityContextPattern' },
        ],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 52,
      name: 'Prevent container from running with root privileges',
      uniqueName: 'CONTAINERS_INCORRECT_RUNASNONROOT_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-running-with-root-privileges',
      messageOnFailure:
        'Invalid value for key `runAsNonRoot` - must be set to `true` to prevent unnecessary privileges',
      category: 'NSA',
      schema: {
        definitions: {
          containerSecurityPattern: {
            properties: {
              spec: {
                properties: {
                  containers: {
                    type: 'array',
                    items: {
                      properties: {
                        securityContext: {
                          properties: {
                            runAsNonRoot: { const: true },
                          },
                          required: ['runAsNonRoot'],
                        },
                      },
                      required: ['securityContext'],
                    },
                  },
                },
              },
            },
          },
          podSecurityContextPattern: {
            if: { properties: { kind: { enum: ['Pod'] } } },
            then: {
              properties: {
                spec: {
                  properties: {
                    securityContext: {
                      properties: { runAsNonRoot: { const: true } },
                      required: ['runAsNonRoot'],
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [
          { $ref: '#/definitions/containerSecurityPattern' },
          { $ref: '#/definitions/podSecurityContextPattern' },
        ],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 53,
      name: 'Prevent service account token auto-mounting on pods',
      uniqueName: 'SRVACC_INCORRECT_AUTOMOUNTSERVICEACCOUNTTOKEN_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-service-account-token-auto-mount',
      messageOnFailure:
        'Invalid value for key `automountServiceAccountToken` - must be set to `false` to prevent granting unnecessary access to the service account',
      category: 'NSA',
      schema: {
        definitions: {
          podPattern: {
            if: { properties: { kind: { enum: ['Pod'] } } },
            then: {
              properties: {
                spec: {
                  properties: {
                    automountServiceAccountToken: { const: false },
                  },
                  required: ['automountServiceAccountToken'],
                },
              },
            },
          },
          serviceAccountPattern: {
            if: {
              properties: { kind: { enum: ['ServiceAccount'] } },
            },
            then: {
              properties: {
                automountServiceAccountToken: { const: false },
              },
              required: ['automountServiceAccountToken'],
            },
          },
        },
        allOf: [
          { $ref: '#/definitions/podPattern' },
          { $ref: '#/definitions/serviceAccountPattern' },
        ],
      },
    },
    {
      id: 54,
      name: 'Ensure resource has a configured name',
      uniqueName: 'RESOURCE_MISSING_NAME',
      enabledByDefault: true,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-resource-name',
      messageOnFailure:
        'Missing key `name` or `generateName` - one of them must be set to apply resource to a cluster',
      category: 'Other',
      schema: {
        definitions: {
          metadataNamePattern: {
            properties: {
              metadata: {
                type: 'object',
                properties: { name: { type: 'string' } },
                required: ['name'],
              },
            },
            required: ['metadata'],
          },
          metadataGenerateNamePattern: {
            properties: {
              metadata: {
                type: 'object',
                properties: { generateName: { type: 'string' } },
                required: ['generateName'],
              },
            },
            required: ['metadata'],
          },
        },
        if: {
          properties: { kind: { not: { enum: ['Kustomization'] } } },
        },
        then: {
          anyOf: [
            { $ref: '#/definitions/metadataNamePattern' },
            { $ref: '#/definitions/metadataGenerateNamePattern' },
          ],
        },
      },
    },
    {
      id: 55,
      name: 'Ensure each container probe has an initial delay configured',
      uniqueName: 'CONTAINERS_INCORRECT_INITIALDELAYSECONDS_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-initial-probe-delay',
      messageOnFailure:
        'Incorrect value for key `initialDelaySeconds` - set explicitly to control the start time before a probe is initiated (min 0)',
      category: 'Containers',
      schema: {
        definitions: {
          probePattern: {
            if: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      items: {
                        anyOf: [
                          {
                            required: ['livenessProbe'],
                          },
                          {
                            required: ['readinessProbe'],
                          },
                          {
                            required: ['startupProbe'],
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      items: {
                        properties: {
                          livenessProbe: {
                            properties: {
                              initialDelaySeconds: { minimum: 0 },
                            },
                            required: ['initialDelaySeconds'],
                          },
                          readinessProbe: {
                            properties: {
                              initialDelaySeconds: { minimum: 0 },
                            },
                            required: ['initialDelaySeconds'],
                          },
                          startupProbe: {
                            properties: {
                              initialDelaySeconds: { minimum: 0 },
                            },
                            required: ['initialDelaySeconds'],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/probePattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 56,
      name: 'Ensure each container probe has a configured frequency',
      uniqueName: 'CONTAINERS_INCORRECT_PERIODSECONDS_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-probe-frequency',
      messageOnFailure:
        'Incorrect value for key `periodSeconds` - set explicitly to control how often a probe is performed (min 1)',
      category: 'Containers',
      schema: {
        definitions: {
          probePattern: {
            if: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      items: {
                        anyOf: [
                          {
                            required: ['livenessProbe'],
                          },
                          {
                            required: ['readinessProbe'],
                          },
                          {
                            required: ['startupProbe'],
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      items: {
                        properties: {
                          livenessProbe: {
                            properties: {
                              periodSeconds: { minimum: 1 },
                            },
                            required: ['periodSeconds'],
                          },
                          readinessProbe: {
                            properties: {
                              periodSeconds: { minimum: 1 },
                            },
                            required: ['periodSeconds'],
                          },
                          startupProbe: {
                            properties: {
                              periodSeconds: { minimum: 1 },
                            },
                            required: ['periodSeconds'],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/probePattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 57,
      name: 'Ensure each container probe has a configured timeout',
      uniqueName: 'CONTAINERS_INCORRECT_TIMEOUTSECONDS_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-probe-timeout',
      messageOnFailure:
        'Incorrect value for key `timeoutSeconds` - set explicitly to control when a probe times out (min 1)',
      category: 'Containers',
      schema: {
        definitions: {
          probePattern: {
            if: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      items: {
                        anyOf: [
                          {
                            required: ['livenessProbe'],
                          },
                          {
                            required: ['readinessProbe'],
                          },
                          {
                            required: ['startupProbe'],
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      items: {
                        properties: {
                          livenessProbe: {
                            properties: {
                              timeoutSeconds: { minimum: 1 },
                            },
                            required: ['timeoutSeconds'],
                          },
                          readinessProbe: {
                            properties: {
                              timeoutSeconds: { minimum: 1 },
                            },
                            required: ['timeoutSeconds'],
                          },
                          startupProbe: {
                            properties: {
                              timeoutSeconds: { minimum: 1 },
                            },
                            required: ['timeoutSeconds'],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/probePattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 58,
      name:
        'Ensure each container probe has a configured minimum success threshold',
      uniqueName: 'CONTAINERS_INCORRECT_SUCCESSTHRESHOLD_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-probe-min-success-threshold',
      messageOnFailure:
        'Incorrect value for key `successThreshold` - set explicitly to control when a probe is considered successful after having failed',
      category: 'Containers',
      schema: {
        definitions: {
          probePattern: {
            if: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      items: {
                        anyOf: [
                          {
                            required: ['livenessProbe'],
                          },
                          {
                            required: ['readinessProbe'],
                          },
                          {
                            required: ['startupProbe'],
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      items: {
                        properties: {
                          livenessProbe: {
                            properties: {
                              successThreshold: { const: 1 },
                            },
                            required: ['successThreshold'],
                          },
                          readinessProbe: {
                            properties: {
                              successThreshold: { minimum: 1 },
                            },
                            required: ['successThreshold'],
                          },
                          startupProbe: {
                            properties: {
                              successThreshold: { const: 1 },
                            },
                            required: ['successThreshold'],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/probePattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 59,
      name: 'Ensure each container probe has a configured failure threshold',
      uniqueName: 'CONTAINERS_INCORRECT_FAILURETHRESHOLD_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-probe-failure-threshold',
      messageOnFailure:
        'Incorrect value for key `failureThreshold` - set explicitly to control the number of retries after a probe fails (min 1)',
      category: 'Containers',
      schema: {
        definitions: {
          probePattern: {
            if: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      items: {
                        anyOf: [
                          {
                            required: ['livenessProbe'],
                          },
                          {
                            required: ['readinessProbe'],
                          },
                          {
                            required: ['startupProbe'],
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      items: {
                        properties: {
                          livenessProbe: {
                            properties: {
                              failureThreshold: { minimum: 1 },
                            },
                            required: ['failureThreshold'],
                          },
                          readinessProbe: {
                            properties: {
                              failureThreshold: { minimum: 1 },
                            },
                            required: ['failureThreshold'],
                          },
                          startupProbe: {
                            properties: {
                              failureThreshold: { minimum: 1 },
                            },
                            required: ['failureThreshold'],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/probePattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 60,
      name: 'Ensure each container has a configured pre-stop hook',
      uniqueName: 'CONTAINERS_MISSING_PRESTOP_KEY',
      enabledByDefault: false,
      documentationUrl: 'https://hub.datree.io/built-in-rules/ensure-prestop',
      messageOnFailure:
        'Missing property object `preStop` - set to ensure graceful shutdown of the container',
      category: 'Containers',
      schema: {
        definitions: {
          prestopPattern: {
            properties: {
              spec: {
                properties: {
                  containers: {
                    type: 'array',
                    items: {
                      properties: {
                        lifecycle: {
                          properties: {
                            preStop: { type: 'object' },
                          },
                          required: ['preStop'],
                        },
                      },
                      required: ['lifecycle'],
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [{ $ref: '#/definitions/prestopPattern' }],
        additionalProperties: { $ref: '#' },
        items: { $ref: '#' },
      },
    },
    {
      id: 61,
      name: 'Prevent containers from having unnecessary system call privileges',
      uniqueName: 'CONTAINERS_INCORRECT_SECCOMP_PROFILE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-system-call-privileges',
      messageOnFailure:
        'Incorrect value for key seccompProfile - set an explicit value to prevent malicious use of system calls within the container',
      category: 'Containers',
      complexity: 'medium',
      impact:
        'Running containers/Pods with the `seccomp` profile set to `unconfined` can give attackers dangerous privileges',
      schema: {
        definitions: {
          seccompExplicit: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  oneOf: [
                    {
                      $ref: '#/$defs/securityContextSeccompReq',
                    },
                    {
                      $ref: '#/definitions/seccompExplicitInContainer',
                    },
                  ],
                },
              },
            },
          },
          seccompExplicitInContainer: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                containers: {
                  type: 'array',
                  items: {
                    $ref: '#/$defs/securityContextSeccompReq',
                  },
                },
                initContainers: {
                  type: 'array',
                  items: {
                    $ref: '#/$defs/securityContextSeccompReq',
                  },
                },
                ephemeralContainers: {
                  type: 'array',
                  items: {
                    $ref: '#/$defs/securityContextSeccompReq',
                  },
                },
              },
            },
          },
          seccompPatternInSpec: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  $ref: '#/$defs/securityContextSeccomp',
                },
              },
            },
          },
          seccompPatternInContainer: {
            if: {
              properties: {
                kind: {
                  enum: [
                    'Deployment',
                    'Pod',
                    'DaemonSet',
                    'StatefulSet',
                    'ReplicaSet',
                    'CronJob',
                    'Job',
                  ],
                },
              },
            },
            then: {
              properties: {
                spec: {
                  properties: {
                    containers: {
                      type: 'array',
                      items: {
                        $ref: '#/$defs/securityContextSeccomp',
                      },
                    },
                    initContainers: {
                      type: 'array',
                      items: {
                        $ref: '#/$defs/securityContextSeccomp',
                      },
                    },
                    ephemeralContainers: {
                      type: 'array',
                      items: {
                        $ref: '#/$defs/securityContextSeccomp',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [
          {
            $ref: '#/definitions/seccompExplicit',
          },
          {
            $ref: '#/definitions/seccompPatternInSpec',
          },
          {
            $ref: '#/definitions/seccompPatternInContainer',
          },
        ],
        additionalProperties: {
          $ref: '#',
          items: {
            $ref: '#',
          },
        },
        $defs: {
          securityContextSeccompReq: {
            required: ['securityContext'],
            properties: {
              securityContext: {
                type: 'object',
                required: ['seccompProfile'],
                properties: {
                  seccompProfile: {
                    type: 'object',
                    required: ['type'],
                  },
                },
              },
            },
          },
          securityContextSeccomp: {
            properties: {
              securityContext: {
                type: 'object',
                properties: {
                  seccompProfile: {
                    type: 'object',
                    properties: {
                      type: {
                        not: {
                          enum: ['unconfined', 'Unconfined'],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 62,
      name: 'Prevent exposed BitBucket secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_BITBUCKET',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-bitbucket',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern:
                  '(?:bitbucket)(?:[0-9a-z\\-_\\t .]{0,20})(?:[\\s|\']|[\\s|"]){0,3}(?:=|>|:=|\\|\\|:|<=|=>|:)(?:\'|\\"|\\s|=|\\x60){0,5}([a-z0-9]{32})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 63,
      name: 'Prevent exposed Datadog secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_DATADOG',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-datadog',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern:
                  '(?:datadog)(?:[0-9a-z\\-_\\t .]{0,20})(?:[\\s|\']|[\\s|"]){0,3}(?:=|>|:=|\\|\\|:|<=|=>|:)(?:\'|\\"|\\s|=|\\x60){0,5}([a-z0-9]{40})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 64,
      name: 'Prevent exposed GCP secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_GCP',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-gcp',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern:
                  '\\b(AIza[0-9A-Za-z\\\\-_]{35})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 65,
      name: 'Prevent exposed AWS secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_AWS',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-aws',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern:
                  '(A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 66,
      name: 'Prevent exposed GitHub secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_GITHUB',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-github',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern: '(ghu|ghs)_[0-9a-zA-Z]{36}',
              },
              {
                pattern: 'gho_[0-9a-zA-Z]{36}',
              },
              {
                pattern: 'ghp_[0-9a-zA-Z]{36}',
              },
              {
                pattern: 'ghr_[0-9a-zA-Z]{36}',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 67,
      name: 'Prevent exposed GitLab secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_GITLAB',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-gitlab',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern: 'glpat-[0-9a-zA-Z\\-\\_]{20}',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 68,
      name: 'Prevent exposed Terraform secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_TERRAFORM',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-terraform',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern: '[a-z0-9]{14}\\.atlasv1\\.[a-z0-9\\-_=]{60,70}',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 69,
      name: 'Prevent exposed Heroku secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_HEROKU',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-heroku',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern:
                  '(?:heroku)(?:[0-9a-z\\-_\\t .]{0,20})(?:[\\s|\']|[\\s|"]){0,3}(?:=|>|:=|\\|\\|:|<=|=>|:)(?:\'|\\"|\\s|=|\\x60){0,5}([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 70,
      name: 'Prevent exposed JWT secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_JWT',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-jwt',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern:
                  '\\b(ey[0-9a-z]{30,34}\\.ey[0-9a-z-\\/_]{30,500}\\.[0-9a-zA-Z-\\/_]{10,200})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 71,
      name: 'Prevent exposed LaunchDarkly secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_LAUNCHDARKLY',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-launchdarkly',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern:
                  '(?:launchdarkly)(?:[0-9a-z\\-_\\t .]{0,20})(?:[\\s|\']|[\\s|"]){0,3}(?:=|>|:=|\\|\\|:|<=|=>|:)(?:\'|\\"|\\s|=|\\x60){0,5}([a-z0-9=_\\-]{40})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 72,
      name: 'Prevent exposed New Relic secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_NEWRELIC',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-newrelic',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern:
                  '(?:new-relic|newrelic|new_relic)(?:[0-9a-z\\-_\\t .]{0,20})(?:[\\s|\']|[\\s|"]){0,3}(?:=|>|:=|\\|\\|:|<=|=>|:)(?:\'|\\"|\\s|=|\\x60){0,5}(NRJS-[a-f0-9]{19})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
              {
                pattern:
                  '(?:new-relic|newrelic|new_relic)(?:[0-9a-z\\-_\\t .]{0,20})(?:[\\s|\']|[\\s|"]){0,3}(?:=|>|:=|\\|\\|:|<=|=>|:)(?:\'|\\"|\\s|=|\\x60){0,5}([a-z0-9]{64})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
              {
                pattern:
                  '(?:new-relic|newrelic|new_relic)(?:[0-9a-z\\-_\\t .]{0,20})(?:[\\s|\']|[\\s|"]){0,3}(?:=|>|:=|\\|\\|:|<=|=>|:)(?:\'|\\"|\\s|=|\\x60){0,5}(NRAK-[a-z0-9]{27})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 73,
      name: 'Prevent exposed npm secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_NPM',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-npm',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern:
                  '\\b(npm_[a-z0-9]{36})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 74,
      name: 'Prevent exposed Okta secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_OKTA',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-okta',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern:
                  '(?:okta)(?:[0-9a-z\\-_\\t .]{0,20})(?:[\\s|\']|[\\s|"]){0,3}(?:=|>|:=|\\|\\|:|<=|=>|:)(?:\'|\\"|\\s|=|\\x60){0,5}([a-z0-9=_\\-]{42})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 75,
      name: 'Prevent exposed Stripe secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_STRIPE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-stripe',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern: '(sk|pk)_(test|live)_[0-9a-z]{10,32}',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 76,
      name: 'Prevent exposed SumoLogic secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_SUMOLOGIC',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-sumologic',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern:
                  '(?:sumo)(?:[0-9a-z\\-_\\t .]{0,20})(?:[\\s|\']|[\\s|"]){0,3}(?:=|>|:=|\\|\\|:|<=|=>|:)(?:\'|\\"|\\s|=|\\x60){0,5}([a-z0-9]{14})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
              {
                pattern:
                  '(?:sumo)(?:[0-9a-z\\-_\\t .]{0,20})(?:[\\s|\']|[\\s|"]){0,3}(?:=|>|:=|\\|\\|:|<=|=>|:)(?:\'|\\"|\\s|=|\\x60){0,5}([a-z0-9]{64})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 77,
      name: 'Prevent exposed Twilio secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_TWILIO',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-twilio',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern: 'SK[0-9a-fA-F]{32}',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 78,
      name: 'Prevent exposed Vault secrets in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_VAULT',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-vault',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern:
                  '\\b(hvb\\.[a-z0-9_-]{138,212})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
              {
                pattern:
                  '\\b(hvs\\.[a-z0-9_-]{90,100})(?:[\'|\\"|\\n|\\r|\\s|\\x60|;]|$)',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 79,
      name: 'Prevent exposed private keys in objects',
      uniqueName: 'ALL_EXPOSED_SECRET_PRIVATEKEY',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-exposed-secrets-privatekey',
      messageOnFailure:
        'Secret data found in config - keep your sensitive data elsewhere to prevent it from being stolen',
      category: 'Secrets',
      complexity: 'medium',
      impact:
        'Exposing sensitive data in resource configs is risky and highly unrecommended, as it can be stolen and used maliciously',
      schema: {
        definitions: {
          regexes: {
            anyOf: [
              {
                pattern:
                  '(?i)-----BEGIN[ A-Z0-9_-]{0,100}PRIVATE KEY-----[\\s\\S-]*KEY----',
              },
            ],
          },
        },
        if: {
          properties: {
            kind: {
              not: {
                enum: ['Secret'],
              },
            },
          },
        },
        then: {
          type: 'object',
          additionalProperties: {
            if: {
              type: 'object',
            },
            then: {
              $ref: '#',
            },
            else: {
              if: {
                type: 'array',
              },
              then: {
                items: {
                  if: {
                    type: 'object',
                  },
                  then: {
                    $ref: '#',
                  },
                  else: {
                    if: {
                      type: 'string',
                    },
                    then: {
                      not: {
                        $ref: '#/definitions/regexes',
                      },
                    },
                  },
                },
              },
              else: {
                if: {
                  type: 'string',
                },
                then: {
                  not: {
                    $ref: '#/definitions/regexes',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 80,
      name: 'Ensure each container fully utilizes CPU with no limitations',
      uniqueName: 'EKS_INVALID_CPU_LIMIT',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-no-cpu-limit',
      messageOnFailure:
        'Invalid key `limits.cpu` - refrain from setting a CPU limit to better utilize the CPU and prevent starvation',
      category: 'EKS',
      complexity: 'easy',
      impact:
        'Setting a CPU limit may cause starvation and sub-optimal utilization of the CPU',
      schema: {
        definitions: {
          cpuLimitPattern: {
            properties: {
              spec: {
                properties: {
                  containers: {
                    type: 'array',
                    items: {
                      properties: {
                        resources: {
                          properties: {
                            limits: {
                              type: 'object',
                              not: {
                                required: ['cpu'],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [
          {
            $ref: '#/definitions/cpuLimitPattern',
          },
        ],
        additionalProperties: {
          $ref: '#',
        },
        items: {
          $ref: '#',
        },
      },
    },
    {
      id: 81,
      name: 'Ensure container memory request and memory limit are equal',
      uniqueName: 'EKS_INVALID_MEMORY_REQUEST_LIMIT',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-memory-request-limit-equal',
      messageOnFailure:
        'Invalid value for memory request and/or memory limit - ensure they are equal to prevent unpredictable behavior',
      category: 'EKS',
      complexity: 'easy',
      impact:
        'Setting memory request and limit to different values may cause unpredictable behavior',
      schema: {
        definitions: {
          containerResourcesPattern: {
            properties: {
              spec: {
                properties: {
                  containers: {
                    items: {
                      properties: {
                        resources: {
                          customKeyRule81: {
                            type: 'string',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [
          {
            $ref: '#/definitions/containerResourcesPattern',
          },
        ],
        additionalProperties: {
          $ref: '#',
        },
        items: {
          $ref: '#',
        },
      },
    },
    {
      id: 82,
      name: 'Ensure containers have limited capabilities',
      uniqueName: 'EKS_INVALID_CAPABILITIES_EKS',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-containers-limited-capabilities',
      messageOnFailure:
        'Incorrect value for key `add` - refrain from using insecure capabilities to prevent access to sensitive components',
      category: 'EKS',
      complexity: 'medium',
      impact:
        'Giving containers unnecessary capabilities may compromise them and allow attackers access to sensitive components',
      schema: {
        definitions: {
          specContainerPattern: {
            properties: {
              spec: {
                properties: {
                  containers: {
                    type: 'array',
                    items: {
                      properties: {
                        securityContext: {
                          properties: {
                            capabilities: {
                              properties: {
                                add: {
                                  type: 'array',
                                  items: {
                                    enum: [
                                      'AUDIT_WRITE',
                                      'CHOWN',
                                      'DAC_OVERRIDE',
                                      'FOWNER',
                                      'FSETID',
                                      'KILL',
                                      'MKNOD',
                                      'NET_BIND_SERVICE',
                                      'SETFCAP',
                                      'SETGID',
                                      'SETPCAP',
                                      'SETUID',
                                      'SYS_CHROOT',
                                    ],
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [
          {
            $ref: '#/definitions/specContainerPattern',
          },
        ],
        additionalProperties: {
          $ref: '#',
        },
        items: {
          $ref: '#',
        },
      },
    },
    {
      id: 83,
      name: 'Ensure multiple replicas run on different nodes',
      uniqueName: 'EKS_MISSING_KEY_TOPOLOGYKEY',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-replicas-different-nodes',
      messageOnFailure:
        'Missing key `topologyKey` - add it to ensure replicas are spread across multiple nodes',
      category: 'EKS',
      complexity: 'medium',
      impact:
        'Running multiple replicas on the same node may cause downtime if the node becomes unavailable',
      schema: {
        definitions: {
          antiAffinityPreferredPattern: {
            properties: {
              spec: {
                properties: {
                  affinity: {
                    properties: {
                      podAntiAffinity: {
                        properties: {
                          preferredDuringSchedulingIgnoredDuringExecution: {
                            type: 'array',
                            items: {
                              properties: {
                                podAffinityTerm: {
                                  properties: {
                                    topologyKey: {
                                      type: 'string',
                                    },
                                  },
                                  required: ['topologyKey'],
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          antiAffinityRequiredPattern: {
            properties: {
              spec: {
                properties: {
                  affinity: {
                    properties: {
                      podAntiAffinity: {
                        properties: {
                          requiredDuringSchedulingIgnoredDuringExecution: {
                            type: 'array',
                            items: {
                              properties: {
                                podAffinityTerm: {
                                  properties: {
                                    topologyKey: {
                                      type: 'string',
                                    },
                                  },
                                  required: ['topologyKey'],
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [
          {
            $ref: '#/definitions/antiAffinityPreferredPattern',
          },
          {
            $ref: '#/definitions/antiAffinityRequiredPattern',
          },
        ],
        additionalProperties: {
          $ref: '#',
        },
        items: {
          $ref: '#',
        },
      },
    },
    {
      id: 84,
      name: 'Prevent pods from becoming unschedulable',
      uniqueName: 'EKS_INVALID_VALUE_DONOOTSCHEDULE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-pods-becoming-unschedulable',
      messageOnFailure:
        'Incorrect value for key `whenUnsatisfiable` - use a different value to ensure your pod does not become unschedulable',
      category: 'EKS',
      complexity: 'easy',
      impact:
        "Setting `whenUnsatisfiable` to `DoNotSchedule` will cause pods to be “unschedulable” if the topology spread constraint can't be fulfilled",
      schema: {
        definitions: {
          specConstraintsPattern: {
            properties: {
              spec: {
                properties: {
                  topologySpreadConstraints: {
                    type: 'array',
                    items: {
                      properties: {
                        whenUnsatisfiable: {
                          not: {
                            enum: ['DoNotSchedule'],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [
          {
            $ref: '#/definitions/specConstraintsPattern',
          },
        ],
        additionalProperties: {
          $ref: '#',
        },
        items: {
          $ref: '#',
        },
      },
    },
    {
      id: 85,
      name:
        'Prevent Windows containers from running with unnecessary privileges',
      uniqueName: 'EKS_INVALID_HOSTPROCESS_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-windows-containers-unnecessary-privileges',
      messageOnFailure:
        "Incorrect value for key `hostProcess` - don't set or set to false to prevent unnecessary privileges",
      category: 'EKS',
      complexity: 'easy',
      impact:
        "Setting `hostProcess` to `true` will cause pods to be “unschedulable” if the topology spread constraint can't be fulfilled",
      schema: {
        definitions: {
          hostProcessPattern: {
            properties: {
              windowsOptions: {
                properties: {
                  hostProcess: {
                    enum: [false],
                  },
                },
              },
            },
          },
        },
        allOf: [
          {
            $ref: '#/definitions/hostProcessPattern',
          },
        ],
        additionalProperties: {
          $ref: '#',
        },
        items: {
          $ref: '#',
        },
      },
    },
    {
      id: 86,
      name:
        'Prevent SELinux containers from running with unnecessary privileges',
      uniqueName: 'EKS_INVALID_SELINUXOPTIONS_TYPE_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-selinux-containers-unnecessary-privileges',
      messageOnFailure:
        'Invalid value for key `type` - set to a predefined type to prevent unnecessary privileges',
      category: 'EKS',
      complexity: 'medium',
      impact:
        'Using a different type than the allowed ones may grant attackers access to sensitive components',
      schema: {
        definitions: {
          selinuxTypePattern: {
            properties: {
              securityContext: {
                properties: {
                  seLinuxOptions: {
                    properties: {
                      type: {
                        enum: [
                          'container_t',
                          'container_init_t',
                          'container_kvm_t',
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [
          {
            $ref: '#/definitions/selinuxTypePattern',
          },
        ],
        additionalProperties: {
          $ref: '#',
        },
        items: {
          $ref: '#',
        },
      },
    },
    {
      id: 87,
      name: 'Prevent SELinux containers from setting a user',
      uniqueName: 'EKS_INVALID_SELINUXOPTIONS_USER_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-selinux-containers-user',
      messageOnFailure:
        'Invalid key `user` - refrain from setting this key to prevent potential access to the host filesystem',
      category: 'EKS',
      complexity: 'easy',
      impact:
        'Setting an SELinux user may grant attackers access to sensitive components',
      schema: {
        definitions: {
          selinuxUserPattern: {
            properties: {
              securityContext: {
                properties: {
                  seLinuxOptions: {
                    not: {
                      required: ['user'],
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [
          {
            $ref: '#/definitions/selinuxUserPattern',
          },
        ],
        additionalProperties: {
          $ref: '#',
        },
        items: {
          $ref: '#',
        },
      },
    },
    {
      id: 88,
      name: 'Prevent SELinux containers from setting a role',
      uniqueName: 'EKS_INVALID_SELINUXOPTIONS_ROLE_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-selinux-containers-role',
      messageOnFailure:
        'Invalid key `role` - refrain from setting this key to prevent potential access to the host filesystem',
      category: 'EKS',
      complexity: 'easy',
      impact:
        'Setting an SELinux role may grant attackers access to sensitive components',
      schema: {
        definitions: {
          selinuxUserPattern: {
            properties: {
              securityContext: {
                properties: {
                  seLinuxOptions: {
                    not: {
                      required: ['role'],
                    },
                  },
                },
              },
            },
          },
        },
        allOf: [
          {
            $ref: '#/definitions/selinuxUserPattern',
          },
        ],
        additionalProperties: {
          $ref: '#',
        },
        items: {
          $ref: '#',
        },
      },
    },
    {
      id: 89,
      name: 'Ensure hostPath volume mounts are read-only',
      uniqueName: 'EKS_INVALID_HOSTPATH_MOUNT_READONLY_VALUE',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/ensure-hostpath-mounts-readonly',
      messageOnFailure:
        "Invalid key `readOnly` - set to 'true' to prevent potential attacks on the host filesystem",
      category: 'EKS',
      complexity: 'easy',
      impact:
        'Not setting hostPath mounts as `readOnly` may allow attackers to modify the host filesystem',
      schema: {
        definitions: {
          specContainers: {
            properties: {
              spec: {
                customKeyRule89: {
                  type: 'string',
                },
              },
            },
          },
        },
        allOf: [
          {
            $ref: '#/definitions/specContainers',
          },
        ],
        additionalProperties: {
          $ref: '#',
        },
        items: {
          $ref: '#',
        },
      },
    },
    {
      id: 90,
      name: 'Prevent deprecated APIs in Kubernetes v1.19',
      uniqueName: 'K8S_DEPRECATED_APIVERSION_1.19',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-deprecated-api-119',
      messageOnFailure:
        'Incorrect value for key `apiVersion` - the version of the resource you are trying to use is deprecated in k8s v1.19',
      category: 'Deprecation',
      complexity: 'easy',
      impact:
        'Deploying a resource with a deprecated API version will cause Kubernetes to reject it',
      schema: {
        allOf: [
          {
            if: {
              properties: {
                apiVersion: {
                  enum: ['networking.k8s.io/v1beta1'],
                },
              },
            },
            then: {
              properties: {
                kind: {
                  not: {
                    enum: ['Ingress', 'IngressClass'],
                  },
                },
              },
            },
          },
          {
            if: {
              properties: {
                apiVersion: {
                  enum: ['storage.k8s.io/v1beta1'],
                },
              },
            },
            then: {
              properties: {
                kind: {
                  not: {
                    enum: ['CSIDriver'],
                  },
                },
              },
            },
          },
          {
            if: {
              properties: {
                apiVersion: {
                  enum: ['certificates.k8s.io/v1beta1'],
                },
              },
            },
            then: {
              properties: {
                kind: {
                  not: {
                    enum: ['CertificateSigningRequest'],
                  },
                },
              },
            },
          },
          {
            if: {
              properties: {
                apiVersion: {
                  enum: ['events.k8s.io/v1beta1'],
                },
              },
            },
            then: {
              properties: {
                kind: {
                  not: {
                    enum: ['Event'],
                  },
                },
              },
            },
          },
          {
            if: {
              properties: {
                apiVersion: {
                  enum: ['coordination.k8s.io/v1beta1'],
                },
              },
            },
            then: {
              properties: {
                kind: {
                  not: {
                    enum: ['Lease', 'LeaseList'],
                  },
                },
              },
            },
          },
          {
            if: {
              properties: {
                apiVersion: {
                  enum: ['apiregistration.k8s.io/v1beta1'],
                },
              },
            },
            then: {
              properties: {
                kind: {
                  not: {
                    enum: ['APIService', 'APIServiceList'],
                  },
                },
              },
            },
          },
        ],
      },
    },
    {
      id: 91,
      name: 'Prevent deprecated APIs in Kubernetes v1.21',
      uniqueName: 'K8S_DEPRECATED_APIVERSION_1.21',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-deprecated-api-121',
      messageOnFailure:
        'Incorrect value for key `apiVersion` - the version of the resource you are trying to use is deprecated in k8s v1.21',
      category: 'Deprecation',
      complexity: 'easy',
      impact:
        'Deploying a resource with a deprecated API version will cause Kubernetes to reject it',
      schema: {
        allOf: [
          {
            if: {
              properties: {
                apiVersion: {
                  enum: ['policy/v1beta1'],
                },
              },
            },
            then: {
              properties: {
                kind: {
                  not: {
                    enum: [
                      'PodSecurityPolicy',
                      'PodDisruptionBudget',
                      'PodDisruptionBudgetList',
                    ],
                  },
                },
              },
            },
          },
          {
            if: {
              properties: {
                apiVersion: {
                  enum: ['batch/v1beta1'],
                },
              },
            },
            then: {
              properties: {
                kind: {
                  not: {
                    enum: ['CronJob', 'CronJobList'],
                  },
                },
              },
            },
          },
          {
            if: {
              properties: {
                apiVersion: {
                  enum: ['discovery.k8s.io/v1beta1'],
                },
              },
            },
            then: {
              properties: {
                kind: {
                  not: {
                    enum: ['EndpointSlice'],
                  },
                },
              },
            },
          },
          {
            if: {
              properties: {
                apiVersion: {
                  enum: ['audit.k8s.io/v1beta1', 'audit.k8s.io/v1alpha1'],
                },
              },
            },
            then: {
              properties: {
                kind: {
                  not: {
                    enum: ['Event', 'EventList', 'Policy', 'PolicyList'],
                  },
                },
              },
            },
          },
        ],
      },
    },
    {
      id: 92,
      name: 'Prevent deprecated APIs in Kubernetes v1.22',
      uniqueName: 'K8S_DEPRECATED_APIVERSION_1.22',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-deprecated-api-122',
      messageOnFailure:
        'Incorrect value for key `apiVersion` - the version of the resource you are trying to use is deprecated in k8s v1.22',
      category: 'Deprecation',
      complexity: 'easy',
      impact:
        'Deploying a resource with a deprecated API version will cause Kubernetes to reject it',
      schema: {
        allOf: [
          {
            if: {
              properties: {
                apiVersion: {
                  enum: ['autoscaling/v2beta1'],
                },
              },
            },
            then: {
              properties: {
                kind: {
                  not: {
                    enum: [
                      'HorizontalPodAutoscaler',
                      'HorizontalPodAutoscalerList',
                    ],
                  },
                },
              },
            },
          },
        ],
      },
    },
    {
      id: 93,
      name: 'Prevent deprecated APIs in Kubernetes v1.23',
      uniqueName: 'K8S_DEPRECATED_APIVERSION_1.23',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-deprecated-api-123',
      messageOnFailure:
        'Incorrect value for key `apiVersion` - the version of the resource you are trying to use is deprecated in k8s v1.23',
      category: 'Deprecation',
      complexity: 'easy',
      impact:
        'Deploying a resource with a deprecated API version will cause Kubernetes to reject it',
      schema: {
        allOf: [
          {
            if: {
              properties: {
                apiVersion: {
                  enum: ['autoscaling/v2beta2'],
                },
              },
            },
            then: {
              properties: {
                kind: {
                  not: {
                    enum: [
                      'HorizontalPodAutoscaler',
                      'HorizontalPodAutoscalerList',
                    ],
                  },
                },
              },
            },
          },
        ],
      },
    },
    {
      id: 94,
      name: 'Prevent deprecated APIs in Kubernetes v1.24',
      uniqueName: 'K8S_DEPRECATED_APIVERSION_1.24',
      enabledByDefault: false,
      documentationUrl:
        'https://hub.datree.io/built-in-rules/prevent-deprecated-api-124',
      messageOnFailure:
        'Incorrect value for key `apiVersion` - the version of the resource you are trying to use is deprecated in k8s v1.24',
      category: 'Deprecation',
      complexity: 'easy',
      impact:
        'Deploying a resource with a deprecated API version will cause Kubernetes to reject it',
      schema: {
        allOf: [
          {
            if: {
              properties: {
                apiVersion: {
                  enum: ['storage.k8s.io/v1beta1'],
                },
              },
            },
            then: {
              properties: {
                kind: {
                  not: {
                    enum: ['CSIStorageCapacity'],
                  },
                },
              },
            },
          },
        ],
      },
    },
  ],
};
