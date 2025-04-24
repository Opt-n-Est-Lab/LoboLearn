import QR from 'qrcode-svg';
import { unsafeHtml } from '@prairielearn/html';
import { Modal } from './Modal.html.js';
export function QRCodeModal({ id, title, content, }) {
    const qrCodeSvg = new QR({ content, container: 'svg-viewbox' }).svg();
    return Modal({
        id,
        title,
        form: false,
        body: unsafeHtml(qrCodeSvg),
    });
}
//# sourceMappingURL=QRCodeModal.html.js.map