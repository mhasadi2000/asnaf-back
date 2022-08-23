"use strict";

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));


const apiKey ="";
const baseUrlAsanak = "https://panel.asanak.com";
const usernameAsanak = "pishrun";
const passwordAsanak = "Pishrun@654";
const sourceAsanak = "982100021";

module.exports = () => ({

  async sendSmsAsanak(receptor, template) {
    const params = new URLSearchParams();
    params.append("username", usernameAsanak);
    params.append("password", passwordAsanak);
    params.append("source", sourceAsanak);
    params.append(`destination`, receptor);
    params.append(`message`, template);
    
    const url = new URL("webservice/v1rest/sendsms", baseUrlAsanak);
    const response = await fetch(url.href, {
      method: "POST",
      headers: {
        apiKey,
      },
      body: params,
    });

    console.log(response);
  },
});