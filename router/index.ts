export const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
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
  {
    name: '3D地球',
    path: '/Earth',
    component: './Earth',
  },
];
