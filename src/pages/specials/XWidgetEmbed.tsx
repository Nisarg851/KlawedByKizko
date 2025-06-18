import { useEffect, useRef } from 'react';

const XWidgetEmbed = () => {
  const tweetRef = useRef(null);

  useEffect(() => {
    // Load Twitter script if it's not already present
    const scriptExists = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');

    if (!scriptExists) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);

      script.onload = () => {
        if (window?.twttr?.widgets && tweetRef.current) {
          window.twttr.widgets.load(tweetRef.current);
        }
      };
    } else if (window?.twttr?.widgets && tweetRef.current) {
      window.twttr.widgets.load(tweetRef.current);
    }
  }, []);

  return (
    <div ref={tweetRef}>
      <blockquote
        className="twitter-tweet"
        data-lang="en"
        data-theme="dark"
      >
        <p lang="en" dir="ltr">
          thank you everyone who came by my artist alley booth today! the love
          in person and on broadcast has been unreal 🥹🫶🫶{' '}
          <a href="https://twitter.com/hashtag/VALORANTMasters?src=hash&amp;ref_src=twsrc%5Etfw">
            #VALORANTMasters
          </a>{' '}
          <a href="https://t.co/kBLKd52s1k">pic.twitter.com/kBLKd52s1k</a>
        </p>
        &mdash; klawedbykiz @ VCT Masters Toronto (@_kizko_){' '}
        <a href="https://twitter.com/_kizko_/status/1934073858341937429?ref_src=twsrc%5Etfw">
          June 15, 2025
        </a>
      </blockquote>
    </div>
  );
};

export default XWidgetEmbed;
