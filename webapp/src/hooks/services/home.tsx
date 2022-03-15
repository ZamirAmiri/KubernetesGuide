export async function getHome(){
    const url:string = 'http://dev.kubeguide.com/rest/api/v1';
    const response:Response = await fetch(url);
    let json = await response.json();
    return json;
}
