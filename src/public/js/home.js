const realtimeProductsForm = document.getElementById('realtime-products-form');

realtimeProductsForm.addEventListener('submit', function (event) {
    event.preventDefault();
    fetch('/api/sessions/current')
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                window.location.href = '/realtimeproducts';
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Acceso denegado',
                    text: 'Debe iniciar sesión o registrarse para ver esta página',
                    showCancelButton: true,
                    confirmButtonText: 'Registrarme',
                    cancelButtonText: 'Iniciar Sesión',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/register';
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        window.location.href = '/login';
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error al verificar la autenticación del usuario:', error);
        });
});