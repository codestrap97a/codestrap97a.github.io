
const GET_USER_ARTICLES = `
    query GETUserArticles($page: Int!){
        user(username:"BlakeYeboah"){
            publication {
                posts(page:$page){
                    title
                    brief
                    slug
                }
            }
        }
    }
`;


async function graphqlQuery(query, variable = {})
{
    const data = await fetch("https://api.hashnode.com/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variable
        })

    });
    return data.json();
}


graphqlQuery(GET_USER_ARTICLES, { page: 0 })
    .then(result => {
        const articles = result.data.user.publication.posts;
        let container = document.createElement('div');

        articles.forEach(article => {
            let title = document.createElement('h2');
            title.innerText = article.title;

            let brief = document.createElement('p');
            brief.innerText = article.brief;

            let link = document.createElement('a');
            link.innerText = 'Read more...';
            link.href = `https://catalins.tech/${article.slug}`;

            container.appendChild(title);
            container.appendChild(brief);
            container.appendChild(link);
        })

        document.querySelector('.app').appendChild(container);
    });

document.getElementById('articles').parentNode.innerHTML = `
<div class="app">
    <h1 class="app-heading">Catalin Pit's Articles</h1>
</div>`;