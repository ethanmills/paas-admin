import moment from 'moment';
import roundDown from '../moment/round';

export type ElasticsearchMetricName = string;

export type CloudFrontMetricName = string;
export type ElasticacheMetricName = string;
export type RDSMetricName = string;

export type MetricName =
  ElasticsearchMetricName
  | CloudFrontMetricName | ElasticacheMetricName | RDSMetricName
;

export type ServiceLabel = 'postgres' | 'mysql' | 'redis' | string;
export type ServiceType = 'rds' | 'elasticache' | 'cloudfront';

export interface IMetric {
  date: Date;
  value: number;
}

export interface IMetricSerieSummary {
  label: string;

  average: number;
  latest: number;
  min: number;
  max: number;
}

export interface IMetricSerie {
  label: string;

  metrics: ReadonlyArray<IMetric>;
}

export interface IMetricDataGetter {
  readonly getData: (
    metricNames: ReadonlyArray<MetricName>,
    guid: string,
    period: moment.Duration,
    rangeStart: moment.Moment,
    rangeStop: moment.Moment,
  ) => Promise<{[key in MetricName]: ReadonlyArray<IMetricSerie>}>;
}

export interface IMetricGraphDisplayable {
  readonly summaries: ReadonlyArray<IMetricSerieSummary>;
  readonly series: ReadonlyArray<IMetricSerie>;
}

/* tslint:disable:insecure-random */
/* istanbul ignore next */
export function getGappyRandomData(): {
  readonly timestamps: ReadonlyArray<string>,
  readonly values: ReadonlyArray<number>,
} {
  const minutesInADay = 24 * 60;
  const timestamps: string[] = [];
  const values: number[] = [];

  const startTime = roundDown(moment().subtract(1, 'day'), moment.duration(5, 'minutes'));
  for (let i = 0; i < minutesInADay; i += 5) {
    if (i < minutesInADay * 0.2 || i > minutesInADay * 0.8 && i < minutesInADay * 0.9) {
      // do nothing - empty piece of the graph
    } else {
      timestamps.push(startTime.clone().add(i, 'minutes').toISOString());
      let value = 0;
      if (values.length === 0) {
        value = Math.random() * 105;
      } else {
        value = values[values.length - 1] + 10 * (Math.random() - 0.5);
        value = value > 0 ? value : 0;
      }
      values.push(value);
    }
  }
  return { timestamps, values };
}
/* tslint:enable:insecure-random */
