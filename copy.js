;<div class="content">
  <h2 class="stretch-name">${stretch.stretchName}</h2>
  <div class="result-container">
    <div class="stretch-details">
      <p class="stretch-description">${stretch.stretchDesc}</p>
      <div class="tags-box">
        <h5 class="tag-title">Tags:</h5>${tagString}
      </div>
      <div id="timer" class="timer-box">
        00:00
      </div>
    </div>
    <div class="stretch-img-box">
      <img class="stretch-img" src="${stretch.img}" alt="Stretch Image" />
    </div>
  </div>
  <button class="btn" onClick="window.location.reload()">
    Find a new stretch
  </button>
</div>
