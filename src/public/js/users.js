document.addEventListener('DOMContentLoaded', function () {
    const changeRoleButtons = document.querySelectorAll('.change-role-btn');

    changeRoleButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            const userId = button.dataset.userId;

            fetch(`/api/users/${userId}/changerole`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al cambiar el rol del usuario');
                    }
                    return response.json();
                })
                .then(data => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Cambio de rol exitoso',
                        text: 'El rol del usuario ha sido cambiado correctamente.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        location.reload();
                    });
                })
                .catch(error => {
                    console.error('Error al cambiar el rol del usuario:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al cambiar el rol del usuario. Por favor, inténtalo de nuevo más tarde.',
                        confirmButtonText: 'Aceptar'
                    });
                });
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete-user-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const userId = button.dataset.userId;
            Swal.fire({
                icon: 'warning',
                title: '¿Estás seguro?',
                text: 'Esta acción eliminará permanentemente al usuario. ¿Estás seguro de que quieres continuar?',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`/api/users/${userId}`, {
                        method: 'DELETE'
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error al eliminar el usuario');
                            }
                            return response.json();
                        })
                        .then(data => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Usuario eliminado',
                                text: 'El usuario ha sido eliminado correctamente.',
                                confirmButtonText: 'Aceptar'
                            }).then(() => {
                                location.reload();
                            });
                        })
                        .catch(error => {
                            console.error('Error al eliminar el usuario:', error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Hubo un error al eliminar al usuario. Por favor, inténtalo de nuevo más tarde.',
                                confirmButtonText: 'Aceptar'
                            });
                        });
                }
            });
        });
    });
});