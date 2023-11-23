import CountryForm from "./components/countryForm";
import styles from "./page.module.css";
import { parseStringPromise } from "xml2js";

async function findCountry(data: FormData) {
  "use server";
  const title = data.get("title")?.valueOf();

  const xmlPayload = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:gs="http://spring.io/guides/gs-producing-web-service">
      <soapenv:Header/>
      <soapenv:Body>
        <gs:getCountryRequest>
          <gs:name>${title}</gs:name>
        </gs:getCountryRequest>
      </soapenv:Body>
    </soapenv:Envelope>
  `;

  const response = await fetch("http://localhost:8080/ws", {
    method: "POST",
    headers: {
      "Content-Type": "text/xml",
    },
    body: xmlPayload,
  });
  const country = await response.text();
  const parsedData = await parseStringPromise(country);
  const countryData = {
    name: parsedData["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
      "ns2:getCountryResponse"
    ][0]["ns2:country"][0]["ns2:name"][0],
    population: parseInt(
      parsedData["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
        "ns2:getCountryResponse"
      ][0]["ns2:country"][0]["ns2:population"][0]
    ),
    capital:
      parsedData["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
        "ns2:getCountryResponse"
      ][0]["ns2:country"][0]["ns2:capital"][0],
    currency:
      parsedData["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
        "ns2:getCountryResponse"
      ][0]["ns2:country"][0]["ns2:currency"][0],
  };
  return countryData;
}

export default function Home() {
  return (
    <main className={styles.main}>
      <CountryForm onSubmit={findCountry} />
    </main>
  );
}
