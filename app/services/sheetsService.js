import * as http from "tns-core-modules/http";
import BackendService from "./backendService";

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
                    if (b[4] > a[4]) return 1;
                    if (b[4] < a[4]) return -1;
                    if (b[2] > a[2]) return 1;
                    if (b[2] < a[2]) return -1;
                }

                let listLength = data.values.length;
                let date = "";
                let day = "";
                let month = "";
                let year = "";

                for (let i = 0; i < listLength; i++) {
                    date = data.values[i][2];
                    if (date != "0") {
                        day = date.slice(0, 2);
                        month = date.slice(3, 6);
                        year = date.slice(6, 10);
                        data.values[i][5] = new Date(`${month}/${day}/${year}`);
                    }
                }

                return data.values.sort(listSorting).map(item => {
                    return {
                        name: item[0] || "",
                        lastName: item[1] || "",
                        birthday: item[2] || "",
                        phone: item[3] || "",
                        status: item[4],
                        birthdayDate: item[5] || ""
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
