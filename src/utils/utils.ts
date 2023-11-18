// 获取assets静态资源
export const getAssetsFile = (url: string) => {
    return new URL(`codemirror/theme/${url}`, import.meta.url).href;
  };
 