import MessageRepository from '../repositories/MessageRepository.js';

const messageRepository = new MessageRepository();

class MessageController {

    // CREATE

    async create(req, res) {
        try {
            console.log('CREATE Message initiated...');

            const {
                firstName = null,
                lastName = null,
                phone = null,
                email = null,
                message = null
            } = req.body;

            const params = {
                firstName,
                lastName,
                phone,
                email,
                message
            };

            console.log('PARAMS: ', params);

            Object.values(params).forEach(param => {
                if(param === null) {
                    throw Error(`Message missing ${params[param]} Param`);
                }
            });

            const data = await messageRepository.create(params);

            res.send({
                message: 'Message Creation Result',
                result: data
            });
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating message'
            });
        }
    }

    // READ
    
    async getMessages(req, res) {
        const data = await messageRepository.getMessages();
        res.send(data);
    }
    
    async getMessageById(req, res) {
        const { id } = req.params;
        const data = await messageRepository.getMessageById(id);
        res.send(data);
    }

    // UPDATE

    async updateMessage(req, res) {
        console.log('UPDATE message hit: ', req.body);
        const {
            id,
            status = null,
            replied = null
        } = req.body;

        const params = {
            status,
            replied
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await messageRepository.updateMessage(id, params);
        res.send(data);
    }

}

export default MessageController;