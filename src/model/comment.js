export class Comment {
    constructor(props = {}) {
        const {
            messageText = '',
            uid = '',
            parentId = ''
        } = props;


        this.messageText = messageText;
        this.uid = uid;
        this.parentId = parentId;

    }
}