#!/bin/bash

set -u

mkdir allure-results

tar -xzvf allure-results-example.tar.gz

mv -v reports/allure-results/example/* allure-results