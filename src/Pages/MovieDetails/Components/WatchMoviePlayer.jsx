const WatchMoviePlayer = ({ src }) => {
  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0&modestbranding=1&autohide=1&showinfo=0`
      : url;
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-[0_0_50px_rgba(245,158,11,0.15)] border border-white/10">
        <iframe
          src={getEmbedUrl(src)}
          title="Movie Player"
          className="absolute top-0 left-0 w-full h-full rounded-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>

      {/* Visual Cue: Cinema Mode hint */}
      <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-[0.2em]">
        Cinema Mode Enabled
      </p>
    </div>
  );
};

export default WatchMoviePlayer;
