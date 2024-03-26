document.querySelectorAll('.addToCartButton').forEach(button => {
    button.addEventListener('click', async (event) => {
        try {
            document.getElementById('loadingSpinner').style.display = 'flex';

            const productId = event.target.dataset.productId;
            const userEmail = email.value;
            const quantity = 1;


            const response = await fetch(`/api/products/${productId}`);
            const data = await response.json();
            const productOwnerEmail = data.owner;

            if (userEmail === productOwnerEmail) {
                Swal.fire({
                    icon: 'error',
                    title: 'Acceso denegado',
                    text: 'Los usuarios premium no pueden agregar su propio producto al carrito',
                    position: 'center',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
                return;
            }

            const addToCartResponse = await fetch(`/api/carts/add/${productId}/${quantity}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const addToCartData = await addToCartResponse.json();

            if (addToCartData.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado al carrito',
                    text: 'El producto se agregó al carrito correctamente',
                    showCancelButton: true,
                    confirmButtonText: 'Añadir',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire('Producto añadido', 'El producto fue añadido correctamente al carrito', 'success');
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire('Producto no añadido', 'El producto no fue añadido al carrito', 'error');
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Acceso denegado',
                    text: 'No tienes permisos para agregar productos a tu carrito',
                    position: 'center',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
            document.getElementById('loadingSpinner').style.display = 'none';

        } catch (error) {
            console.error('Error:', error);
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const chatTab = document.getElementById('chat-tab');
    const chatContainer = document.getElementById('chat-container');
    const chatTabButton = document.getElementById('chat-tab-button');
    const closeChatButton = document.getElementById('close-chat-button');

    chatTabButton.addEventListener('click', function () {
        chatContainer.style.display = 'block';
        chatTab.style.display = 'none';
    });

    closeChatButton.addEventListener('click', function () {
        chatContainer.style.display = 'none';
        chatTab.style.display = 'block';
    });
});

document.getElementById('report-button').addEventListener('click', function () {
    document.getElementById('report-modal').style.display = 'block';
});

document.getElementById('close-report-modal').addEventListener('click', function () {
    document.getElementById('report-modal').style.display = 'none';
});

window.addEventListener('click', function (event) {
    var modal = document.getElementById('report-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const deleteTab = document.getElementById('toggle-button-del');
    const deleteContainer = document.getElementById('delete-container');
    const deleteTabButton = document.getElementById('delete-but');
    const closeDeleteButton = document.getElementById('close-delete-button');

    deleteTabButton.addEventListener('click', function () {
        deleteContainer.style.display = 'block';
        deleteTab.style.display = 'none';
    });

    closeDeleteButton.addEventListener('click', function () {
        deleteContainer.style.display = 'none';
        deleteTab.style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const addTab = document.getElementById('toggle-button-addd');
    const addContainer = document.getElementById('add-container');
    const addTabButton = document.getElementById('add-but');
    const closeAddButton = document.getElementById('close-add-button');

    addTabButton.addEventListener('click', function () {
        addContainer.style.display = 'block';
        addTab.style.display = 'none';
    });

    closeAddButton.addEventListener('click', function () {
        addContainer.style.display = 'none';
        addTab.style.display = 'block';
    });
});
