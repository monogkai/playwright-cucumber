#!/bin/bash

cat allure-report/widgets/summary.json

if grep -R '"status" : "failed"' allure-report/widgets/status-chart.json \
    || grep -R '"status" : "broken"' allure-report/widgets/status-chart.json
    then
        echo "The tests have failed. Please check the Allure Report for more details."
        exit 1
    else
        echo "The tests have passed successfully."
        exit 0
fi