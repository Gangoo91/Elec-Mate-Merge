// Temporary script to trigger materials cache update
import { updateMaterialsCache } from './src/utils/materialsCache.js';

console.log('Starting materials cache population...');
updateMaterialsCache().then(result => {
  console.log('Cache update result:', result);
}).catch(error => {
  console.error('Cache update failed:', error);
});