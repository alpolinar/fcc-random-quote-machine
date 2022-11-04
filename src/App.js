import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuote, selectAuthor, selectStatus, selectColor, fetchQuotes } from './features/quotes/quoteSlice';

function App() {
  const quote = useSelector(selectQuote);
  const author = useSelector(selectAuthor);
  const status = useSelector(selectStatus);
  const color = useSelector(selectColor);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQuotes());
    }
  }, [fetchQuotes, dispatch])

  document.body.style.background = color;
  document.body.style.color = color;

  return (
    <div id="warpper">
      <div id="quote-box">
        <div className="quote-text">
          <i className="fa fa-quote-left"></i>
          <span id="text">{quote}</span>
        </div>
        <div className="quote-author">
          - <span id="author">{author}</span>
        </div>
        <div className="buttons">
          <a className="button" id="tweet-quote" title="Tweet this quote!" target="_top"
            href="https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=%22Your%20time%20is%20limited%2C%20so%20don%E2%80%99t%20waste%20it%20living%20someone%20else%E2%80%99s%20life.%22%20Steve%20Jobs" style={{ background: color }}>
            <i className="fa fa-twitter"></i>
          </a>
          <a className="button" id="tumblr-quote" title="Post this quote on tumblr!" target="_blank"
            href="https://www.tumblr.com/widgets/share/tool?posttype=quote&amp;tags=quotes,freecodecamp&amp;caption=Steve%20Jobs&amp;content=Your%20time%20is%20limited%2C%20so%20don%E2%80%99t%20waste%20it%20living%20someone%20else%E2%80%99s%20life.&amp;canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&amp;shareSource=tumblr_share_button" style={{ background: color }}>
            <i className="fa fa-tumblr"></i>
          </a>
          <button className="button" id="new-quote" onClick={() => dispatch(fetchQuotes())} style={{ background: color }}>New quote</button>
        </div>
      </div>
    </div>
  );
}

export default App;
