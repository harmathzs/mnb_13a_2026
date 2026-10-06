/**
 * GET /api/rates
 * Endpoint for getting currency rates against HUF from MNB by SOAP
 * @param {Request} req 
 * @param {Response} res 
 */
export default async function handler(req, res) {
    console.log("GET /api/rates req.method", req?.method)

    const {method = 'GET'} = req

    switch (method) {
        case 'GET':
            // Callout to MNB by SOAP API
            const endpoint = `http://www.mnb.hu/arfolyamok.asmx`
            const reqBodyXml = `<?xml version="1.0" encoding="UTF-8"?>
                                <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                                    <soap:Body>
                                        <GetCurrentExchangeRates xmlns="http://www.mnb.hu/webservices/"></GetCurrentExchangeRates>
                                    </soap:Body>
                                </soap:Envelope>`
            const soapRes = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                    'SOAPAction': '"http://www.mnb.hu/webservices/MNBArfolyamServiceSoap/GetCurrentExchangeRates"'
                },
                body: reqBodyXml
            })
            console.log('soapRes', soapRes)

            const rates = []
            return res.status(200).json({rates})
        default:
            return res.status(405).json({error: "Method Not Allowed"})
    }
    return res.status(404).json({error: 'Not Found'})
}