export async function sendRequestWithPayload(method, endpoint, payload){
    const headers= {"Content-Type" : "application/json", 'Access-Control-Allow-Origin':'*'}
    const command = {method: method, headers, body : JSON.stringify(payload)};
    const resp = await fetch("http://localhost:8080/" + endpoint, command);
    const jsonRes = resp.json();
    console.log(jsonRes);
    return jsonRes;
}

export async function sendRequest(method, endpoint){
    const headers= {'Access-Control-Allow-Origin':'*'}
    const command = {method: method, headers};
    const resp = await fetch("http://localhost:8080/" + endpoint, command);
    const jsonRes = resp.json();
    return jsonRes;
}


export async function getProducts(setProducts){
    fetch(`http://localhost:8080/api/products/all`)
    .then((res) => res.json())
    .then((data) => setProducts(data));
}

export async function getCatalogs(setCatalogs){
    fetch(`http://localhost:8080/api/catalogs/all`)
    .then((res) => res.json())
    .then((data) => setCatalogs(data));
}

export async function getCart(setItems){
    fetch(`http://localhost:8080/cart/view`)
    .then((res) => res.json())
    .then((data) => setItems(data));
}