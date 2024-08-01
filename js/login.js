document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            // Se a resposta for OK, redireciona para a página desejada
            window.location.href = '/dashboard.html'; // Altere o caminho conforme necessário
        } else {
            const data = await response.json();
            alert(data.message); // Exibe mensagem de erro retornada pelo backend
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

