# DATA CENTER LOCATION PLANNER

This repo is used to plan the selection of distributed data centers around the world. Usually, we need to collect latency data between a series of data centers, and then we need to select a few data centers using for our project. This repo can calculate the best average latency solution from these latency data, and can specify the number of data centers.

## How to use

See `/src/index.ts`, we use AWS regions latencies data for example.

```shell
yarn run start
```

We will get:
```shell
avg latency
  47.90571428571429
data centers:
  Asia Pacific (Singapore) ap-southeast-1
  EU (Paris) eu-west-3
  US East (Ohio) us-east-2
-----------------
avg latency
  48.00380952380952
data centers:
  Asia Pacific (Singapore) ap-southeast-1
  EU (London) eu-west-2
  US East (Ohio) us-east-2
-----------------
avg latency
  48.083333333333336
data centers:
  Asia Pacific (Osaka) ap-northeast-3
  EU (Paris) eu-west-3
  US East (Ohio) us-east-2
...
```
