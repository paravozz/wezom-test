import { createHashHistory } from 'history';
import { HISTORY_BASENAME } from 'constants/env';

const history = createHashHistory({ basename: HISTORY_BASENAME });

export { history };
