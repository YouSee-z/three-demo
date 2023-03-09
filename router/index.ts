export const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'vr',
    path: '/home',
    component: './Home',
  },
  
  {
    name: '3D饼图',
    path: '/piechart',
    component: './Chart',
  },
  {
    name: '例子特效',
    path: '/ParticleEffects',
    component: './ParticleEffects',
  },
];
