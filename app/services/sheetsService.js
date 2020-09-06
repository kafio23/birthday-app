import * as http from "tns-core-modules/http";
import BackendService from "./backendService";
import { constants } from "@/constants";

const appSettings = require("application-settings");

export default class SheetsService extends BackendService {
    load(params) {
        console.log(params);
        return http
            .request({
                url: `${this.baseUrl}${this.spreadsheetId}/values/${this.range}!A2:E?key=${this.apiGoogleKey}`,
                method: "GET",
                headers: this.getHeaders()
            })
            .then(this.validateCode)
            .then(this.getJson)
            .then(data => {
                function listSorting(a, b) {
                    if (b[6] > a[6]) return 1;
                    if (b[6] < a[6]) return -1;
                    if (b[3] > a[3]) return 1;
                    if (b[3] < a[3]) return -1;
                }

                let listLength = data.values.length;
                let day = "";
                let month = "";
                let year = "";
                let actualDate = new Date();

                for (let i = 0; i < listLength; i++) {
                    day = data.values[i][2] || "";
                    month = data.values[i][3] || "";
                    year = data.values[i][4] || "";
                    data.values[i][7] = new Date(`${month}/${day}/${year}`);
                    data.values[i][8] = new Date(
                        `${month}/${day}/${actualDate.getFullYear()}`
                    );

                    if (day != "0") {
                        data.values[i][9] =
                            constants.DAYS[data.values[i][8].getDay()];
                        data.values[i][10] =
                            constants.MONTHS[parseInt(data.values[i][3]) - 1];
                    }
                }

                return data.values.sort(listSorting).map(item => {
                    return {
                        name: item[0] || "",
                        lastName: item[1] || "",
                        birthDay: item[2] || "",
                        birthMonth: item[3] || "",
                        birthYear: item[4] || "",
                        phone: item[5] || "",
                        status: item[6],
                        birthdayDate: item[7] || "",
                        currentBirthdayDate: item[8] || "",
                        currentBirthDayName: item[9] || "",
                        birthMonthName: item[10] || ""
                    };
                });
            });
    }

    getHeaders(toAppend = {}) {
        return Object.assign(
            {
                "Content-Type": "application/json"
            },
            toAppend
        );
    }
}
