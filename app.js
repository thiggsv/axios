const api = axios.create({
    baseURL: "http://localhost:3000/"
});

const section = "users";
let record = [];

const $ = selector => document.querySelector(selector);

async function listar(endpoint = `/${section}`) {
    try {
        const { data } = await api.get(endpoint);
        return data;
    } catch (tomate) {
        console.log("Erro na consulta: " + tomate.message);
    }
}

function renderizar() {
    const isUsers = section === "users";

    $('#page-title').textContent = isUsers ? "Usuários" : "Produtos";
    $('#table-head').innerHTML = isUsers
        ? '<tr><th>Id</th><th>Nome</th><th>Email</th></tr>'
        : '<tr><th>Id</th><th>Produto</th><th>Preço</th></tr>';

    $('#table-body').innerHTML = record.map(item => `
        <tr>
            <td>${item.id ?? "-"}</td>
            <td>${isUsers ? (item.nome ?? "-") : (item.nome ?? "-")}</td>
            <td>${isUsers ? (item.email ?? "-") : (item.Valor ?? "-")}</td>
        </tr>
    `).join("");
}

async function carregar() {
    record = await listar();
    renderizar();
}

carregar();