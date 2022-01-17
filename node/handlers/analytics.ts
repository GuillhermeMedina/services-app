
const axios = require('axios');


export async function analytics(ctx: Context, next: () => Promise<any>) {
  const url = 'https://lojabuettner.vtexcommercestable.com.br/api/oms/pvt/orders/1203221251139-01';

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
 
  ctx.set('cache-control', 'no-cache')
  ctx.set('Access-Control-Allow-Origin', '*')

  const listInfo = await getOrder();
  //@ts-ignore;
  ctx.body = listInfo;
  await next()
}



