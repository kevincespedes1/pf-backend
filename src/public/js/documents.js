document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    document.getElementById('identificationIcon').innerHTML = '&#8987;';
    document.getElementById('proofOfAddressIcon').innerHTML = '&#8987;';
    document.getElementById('bankStatementIcon').innerHTML = '&#8987;';

    try {
        const response = await fetch(`/api/users/{{userId}}/documents`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Hubo un problema al subir los archivos.');
        }

        const data = await response.json();

        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: data.message,
            confirmButtonText: 'Aceptar'
        });

        if (document.getElementById('identification').files.length > 0) {
            document.getElementById('identificationIcon').innerHTML = '&#10003;';
        } else {
            document.getElementById('identificationIcon').innerHTML = '&#10006;';
        }

        if (document.getElementById('proof_of_address').files.length > 0) {
            document.getElementById('proofOfAddressIcon').innerHTML = '&#10003;';
        } else {
            document.getElementById('proofOfAddressIcon').innerHTML = '&#10006;';
        }

        if (document.getElementById('bank_statement').files.length > 0) {
            document.getElementById('bankStatementIcon').innerHTML = '&#10003;';
        } else {
            document.getElementById('bankStatementIcon').innerHTML = '&#10006;';
        }

    } catch (error) {
        console.error('Error al subir documentos:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al subir los documentos. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonText: 'Aceptar'
        });
    }
});
function toggleUserRole(userId) {
    fetch(`/api/users/premium/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.status === 400) {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
            if (!response.ok) {
                throw new Error('No se pudo cambiar el rol del usuario');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: data.message,
                confirmButtonText: 'Aceptar'
            });
        })
        .catch(error => {
            console.error('Error al cambiar el rol del usuario:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
                confirmButtonText: 'Aceptar'
            });
        });
}
