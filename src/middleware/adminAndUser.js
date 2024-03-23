const rolesPermissions = {
    usuario: ['read', 'addToCart', 'removeFromCart', 'purchase', 'sendMessage'],
    premium: ['read', 'create', 'delete', 'addToCart', 'removeFromCart', 'purchase', 'sendMessage'],
    admin: ['read', 'create', 'delete', 'users']
};
function checkPermissions(permission) {
    return (req, res, next) => {
        const sessionCookie = req.headers.cookie;
        if (!sessionCookie) {
            return res.status(403).json({ success: false, message: 'No hay información de sesión disponible' });
        }
        
        const userDataString = sessionCookie.split('user=')[1].split(';')[0];
        const decodedUserDataString = decodeURIComponent(userDataString);
        const userData = JSON.parse(decodedUserDataString);
        const userRole = userData.rol;
        if (rolesPermissions[userRole] && rolesPermissions[userRole].includes(permission)) {
            next(); 
        } else {
            res.status(403).json({ success: false, message: 'Acceso no autorizado, necesita tener otro rol' });
        }
    };
}

export default checkPermissions;
