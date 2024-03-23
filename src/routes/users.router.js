import { Router } from 'express';
import UserController from '../controllers/user.controller.mdb.js';
import { uploader } from '../utils.js';
import userModel from '../dao/models/user.model.js';
import path from 'path';
import checkPermissions from '../middleware/adminAndUser.js';
import sendEmail from '../middleware/userEliminated.js';
const router = Router();
const controller = new UserController();

router.get('/', checkPermissions('users'), async (req, res) => {
    try {
        const users = await controller.getUsers();
        const simplifiedUsers = users.map(user => ({
            last_name: user.last_name,
            email: user.email,
            rol: user.rol
        }));
        
        req.logger.warn('Este contenido debería estar en archivo');
        res.status(200).send({  simplifiedUsers });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        const inactiveUsers = await userModel.find({
            $or: [
                { last_connection: { $lt: Date.now() - (2 * 24 * 60 * 60 * 1000) } }, 
                { last_connection: { $exists: false } } 
            ]
        });

        await userModel.deleteMany({
            _id: { $in: inactiveUsers.map(user => user._id) } 
        });

        await Promise.all(inactiveUsers.map(user => sendEmail(user.email)));


        res.status(200).json({ message: 'Usuarios inactivos eliminados correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuarios inactivos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await controller.removeUserById(userId);

        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});



router.put('/:userId/changerole', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }

        user.rol = user.rol === 'premium' ? 'usuario' : 'premium';

        await user.save();

        res.status(200).json({ message: 'El rol del usuario ha sido cambiado exitosamente', newRole: user.rol });
    } catch (error) {
        console.error('Error al cambiar el rol del usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.put('/premium/:uid', async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.rol === 'premium') {
            return res.status(400).json({ message: 'El usuario ya es premium' });
        }

        const documents = user.documents;
        if (!documents || !documents.identification || !documents.identification.name ||
            !documents.proof_of_address || !documents.proof_of_address.name ||
            !documents.bank_statement || !documents.bank_statement.name) {
            return res.status(400).json({ message: 'El usuario no ha subido todos los documentos necesarios' });
        }


        user.rol = 'premium';
        await user.save();

        return res.status(200).json({ message: 'Cambio de rol exitoso' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.get('/:uid/documents', async (req, res) => {
    try {
        const userDocs = req.session.user.documents
        const userName = req.session.user
        const userId = req.params.uid;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.render('documents', { user, userId, userDocs, userName });

    } catch (error) {
        console.error('Error al obtener los documentos:', error);
        res.status(500).json({ message: 'Error al obtener los documentos PAGINA WEB' });
    }
});

router.post('/:uid/documents', uploader.fields([
    { name: 'identification', maxCount: 1 },
    { name: 'proof_of_address', maxCount: 1 },
    { name: 'bank_statement', maxCount: 1 }
]), async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const files = req.files;

        if (!files || Object.keys(files).length === 0) {
            return res.status(400).json({ message: 'No se han subido archivos' });
        }

        const documents = user.documents || {};

        for (const [key, file] of Object.entries(files)) {
            const documentType = key;
            const fileName = file[0].filename;
            const folder = key === 'identification' ? 'identificaciones' :
                key === 'proof_of_address' ? 'comprobantes_domicilio' :
                    key === 'bank_statement' ? 'comprobantes_cuenta' : 'otros';
            const reference = path.join('/public/img/documents', folder, fileName);

            documents[documentType] = {
                name: fileName,
                reference: reference
            };
        }

        user.documents = documents;

        await user.save();
        res.status(200).json({ message: 'Documentos subidos exitosamente. Se aconseja cerrar y volver a iniciar sesion para que actualize sus archivos a la base de datos' });
    } catch (error) {
        console.error('Error al subir documentos:', error);
        res.status(500).json({ message: 'Error al subir documentos' });
    }
});

export default router;
