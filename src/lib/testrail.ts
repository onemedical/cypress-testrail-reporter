const axios = require('axios');
const chalk = require('chalk');
import { TestRailOptions, TestRailResult } from './testrail.interface';

export class TestRail {
  private base: String;
  private runId: Number;
  private projectId: Number = 2;

  constructor(private options: TestRailOptions) {
    this.base = `https://${options.domain}/index.php?/api/v2`;
  }

    /**
     * Helper method that publishes the testrun results to TestRail via the API
     * gets invoked directly from the cypress-testrail-reporter.js
     * @param results
     */
  public publishResults(results: TestRailResult[]) {
      this.runId = this.options.runId;
      console.log('INSIDE THE PUBLISH PUBLISH TO API')
      this.runId = this.options.runId;
      console.log('RUN_ID:'+ this.runId)
      this.projectId = this.options.projectId;
      console.log('PROJECT_ID:'+ this.projectId)
      console.log('STARTING THE API INVOKATION NOW')

      axios({
          method: 'post',
          url: `${this.base}/add_results_for_cases/${this.runId}`,
          headers: { 'Content-Type': 'application/json' },
          auth: {
              username: this.options.username,
              password: this.options.password,
          },
          data: JSON.stringify({ results }),
      })
          .then(response => {
          console.log('\n', chalk.magenta.underline.bold('(TestRail Reporter)'));
          console.log(
            '\n',
            ` - Results are published to ${chalk.magenta(
              `https://${this.options.domain}/index.php?/runs/view/${this.runId}`
            )}`,
            '\n'
          );
        })
          .catch(error => console.error(error));
    }
  }