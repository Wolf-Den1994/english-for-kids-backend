import { ElemClasses, ElemId, Tags } from '../utils/enums';

export const overlay = document.createElement(Tags.DIV);
overlay.className = ElemClasses.OVERLAY;
overlay.id = ElemId.OVERLAY;
document.body.append(overlay);
