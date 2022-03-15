export async function getHome(){
    const URL:string|undefined = process.env.REACT_APP_BASE_URL;
    const url:string = URL?URL:'http://dev.kubeguide.com/rest/api/v1';
    const response:Response = await fetch(url);
    let json = await response.json();
    return json;
}
