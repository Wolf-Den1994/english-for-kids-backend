import { ElemClasses, ElemId, Tags } from '../utils/enums';

export const root = document.createElement(Tags.DIV);
root.className = ElemClasses.ROOT;
root.id = ElemId.ROOT;
document.body.append(root);
