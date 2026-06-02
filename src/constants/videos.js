/** Free stock videos (Pexels) — food / premium */
export const PRODUCT_VIDEOS = {
  'dry-meat':
    'https://videos.pexels.com/video-files/6616986/6616986-hd_1920_1080_25fps.mp4',
  'dry-vegetables':
    'https://videos.pexels.com/video-files/4057252/4057252-sd_640_360_25fps.mp4',
  'dry-fruits':
    'https://videos.pexels.com/video-files/4994312/4994312-hd_1920_1080_25fps.mp4',
  nuts:
    'https://videos.pexels.com/video-files/4998170/4998170-hd_1920_1080_25fps.mp4',
  hero:
    'https://videos.pexels.com/video-files/5681050/5681050-hd_1920_1080_30fps.mp4',
};

export const getProductVideo = (product) =>
  product.videoUrl ||
  PRODUCT_VIDEOS[product.categoryId] ||
  PRODUCT_VIDEOS.hero;
