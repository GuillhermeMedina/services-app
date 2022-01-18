const axios = require('axios');


export async function analytics(ctx: Context, next: () => Promise<any>) {
  const paramId = getParamsByURL(ctx.request.url);

  const url = `https://lojabuettner.vtexcommercestable.com.br/api/oms/pvt/orders/${paramId}`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-Vtex-Use-Https': 'true',
      'Content-Type': 'application/json',
      'X-VTEX-API-AppKey': 'vtexappkey-lojabuettner-SZWOKM',
      'X-VTEX-API-AppToken': 'ARSDEOKLLHNUMAPSUXXIXKVLLPOMPVQRLTTLFAPLRYPMANJLIJESOPRPWGROAXWPQVJSGDNUHMRZVILYGCEFRXDVCEPYIBKTCZVEDQFEVJKCYRTNVTIYSQXTSOQCOOLG'
    } 
  };

  async function getOrder() {
    const data = await axios(url, options)
    .then((res: { json: () => any; }) => {
      //@ts-ignore;
        const data = res.data;
        
        return data;
    })
    .catch((err: string) => console.error('error:' + err));
    
    return data
  }
 
  ctx.set('cache-control', 'no-cache');
  ctx.set('Access-Control-Allow-Origin', '*');
  
  const listInfo = await getOrder();

  ctx.body = listInfo;
  await next()
}

function getParamsByURL(currentURL: string) {
  const urlParams = new URLSearchParams(currentURL);

  const orderId = urlParams.get('/_v/app/analytics/realTime/orderId');

  return orderId;
}