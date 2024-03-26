document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', async (event) => {
        try {
            const productId = event.target.dataset.productId;
            const userId = event.target.dataset.userId;

            const response = await fetch(`/cart/{{userId}}/products/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Swal.fire('Producto Eliminado', 'El producto fue eliminado correctamente del carrito', 'success');
                location.reload();
            } else {
                alert('Error al eliminar producto del carrito');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

document.getElementById('delete-all-button').addEventListener('click', async () => {
    try {
        const response = await fetch("/cart/{{userId}}", {
            method: 'DELETE',
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Todos los productos han sido eliminados del carrito correctamente',
                confirmButtonText: 'Aceptar'
            });
            location.reload();

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al eliminar todos los productos del carrito',
                confirmButtonText: 'Aceptar'
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
});