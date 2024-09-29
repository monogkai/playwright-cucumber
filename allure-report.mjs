import { Allure, AllureRuntime } from "allure-js-commons";
import { CucumberJSAllureFormatter } from "allure-cucumberjs";

export default class extends CucumberJSAllureFormatter {
    constructor(options) {
        super(
            options,
            new AllureRuntime({
                resultsDir: `./reports/allure-results/${process.env.ACCOUNT}`,
            }),
            {
                labels: [
                    {
                        pattern: [/@feature:(.*)/],
                        name: "epic",
                    },
                    {
                        pattern: [/@severity:(.*)/],
                        name: "severity",
                    },
                ],
                links: [
                    {
                        pattern: [/@issue:(.*)/],
                        name: "issue",
                        urlTemplate: "http://localhost:8080/issue/%s"
                    },
                    {
                        pattern: [/@tms:(.*)/],
                        name: "tms",
                        urlTemplate: "http://localhost:8080/tms/%s"
                    }
                ]
            }
        )
    }
}