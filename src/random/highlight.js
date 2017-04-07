export const highlightMinion = (sculpt) => {
    sculpt.children[0]._threeObject.material.materials[0].emissive.r = 1;
};