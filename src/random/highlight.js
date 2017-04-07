export const highlightMinion = (sculpt) => {
    console.log(sculpt);
    sculpt.children[0]._threeObject.material.materials[0].emissive.r = 1;
};