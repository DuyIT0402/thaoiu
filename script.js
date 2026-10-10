/**
 * ===================================================================
 * BẢN GIAO HƯỞNG TÌNH YÊU - JAVASCRIPT HUYỀN ẢO & HIỆN ĐẠI
 * Tình yêu vĩnh cửu từ: 20/01/2026
 * ===================================================================
 */

// Ngày bắt đầu tình yêu: 20 tháng 01 năm 2026
const START_DATE = new Date("2026-01-20T00:00:00");

// Nội dung bức thư tình gửi vợ yêu
const LOVE_LETTER = `Vợ yêu của anh,

Từ ngày 20 tháng 01 năm 2026, vũ trụ này đã trao cho anh món quà vô giá nhất cuộc đời — đó chính là em, Thẻo Thẻo dịu dàng và đáng yêu của anh.

Dù khoảng cách địa lý giữa Sài Gòn và Bắc Ninh có xa xôi, nhưng anh biết mỗi nhịp đập trong lồng ngực này đều hướng về em. Mỗi buổi sáng thức dậy, điều đầu tiên anh nghĩ đến là nụ cười của vợ; mỗi buổi tối chìm vào giấc ngủ, mong ước lớn nhất của anh là được ôm vợ thật chặt vào lòng.

Cảm ơn em vì đã đến, đã kiên nhẫn, đã yêu thương và cùng anh vun đắp từng khoảnh khắc bình yên. Anh mong vợ yêu của anh luôn vui vẻ, an yên, ăn ngoan, ngủ đẫy giấc và luôn nhớ rằng: ở bất cứ nơi đâu, bất cứ lúc nào, anh cũng luôn là điểm tựa vững chãi nhất của em.

Hôm nay, ngày mai và mãi mãi về sau, tình yêu anh dành cho em vẫn vẹn nguyên và ngày càng sâu thẳm như những vì sao trên bầu trời đêm.

Yêu vợ hơn tất cả mọi điều trên thế gian này! ❤️`;

/* ===================================================================
   1. CANVAS BẦU TRỜI SAO & HIỆU ỨNG THIÊN HÀ
   =================================================================== */
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
let stars = [];
let shootingStars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
}

function initStars() {
  stars = [];
  const starCount = Math.floor((canvas.width * canvas.height) / 4500);
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.6 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.3 ? "#ffffff" : (Math.random() > 0.5 ? "#ffd1dc" : "#ffe4b5")
    });
  }
}

function createShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width * 0.8 + canvas.width * 0.2,
    y: Math.random() * (canvas.height * 0.4),
    len: Math.random() * 90 + 70,
    speed: Math.random() * 10 + 8,
    angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
    opacity: 1
  });
}

// Bắn sao băng ngẫu nhiên mỗi 4-7 giây
setInterval(() => {
  if (Math.random() > 0.3) createShootingStar();
}, 4500);

function renderSky() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Vẽ các vì sao lấp lánh
  stars.forEach(star => {
    star.alpha += star.speed * star.twinkleDir;
    if (star.alpha >= 1) {
      star.alpha = 1;
      star.twinkleDir = -1;
    } else if (star.alpha <= 0.2) {
      star.alpha = 0.2;
      star.twinkleDir = 1;
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.globalAlpha = star.alpha;
    ctx.shadowBlur = star.radius * 3;
    ctx.shadowColor = star.color;
    ctx.fill();
    ctx.restore();
  });

  // Vẽ các sao băng (Shooting stars)
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    const tailX = s.x - Math.cos(s.angle) * s.len;
    const tailY = s.y - Math.sin(s.angle) * s.len;

    const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
    grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
    grad.addColorStop(0.3, `rgba(255, 182, 193, ${s.opacity * 0.7})`);
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(tailX, tailY);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();

    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    s.opacity -= 0.016;

    if (s.opacity <= 0 || s.x > canvas.width || s.y > canvas.height) {
      shootingStars.splice(i, 1);
    }
  }

  requestAnimationFrame(renderSky);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
renderSky();

// Bụi tiên lấp lánh theo con trỏ chuột
window.addEventListener("mousemove", (e) => {
  if (Math.random() > 0.85) {
    createCursorSparkle(e.clientX, e.clientY);
  }
});

window.addEventListener("touchmove", (e) => {
  if (e.touches.length > 0 && Math.random() > 0.8) {
    createCursorSparkle(e.touches[0].clientX, e.touches[0].clientY);
  }
});

function createCursorSparkle(x, y) {
  const spark = document.createElement("div");
  spark.className = "magic-particle";
  spark.textContent = ["✨", "✦", "💖", "🌸"][Math.floor(Math.random() * 4)];
  spark.style.left = `${x - 10 + (Math.random() * 20 - 10)}px`;
  spark.style.top = `${y - 10 + (Math.random() * 20 - 10)}px`;
  spark.style.fontSize = `${Math.random() * 12 + 10}px`;
  spark.style.animationDuration = "1.6s";
  document.body.appendChild(spark);
  setTimeout(() => spark.remove(), 1600);
}

/* ===================================================================
   2. ĐỒNG HỒ ĐẾM THỜI GIAN YÊU NHAU (TỪ 20/01/2026)
   =================================================================== */
const daysEl = document.getElementById("daysCount");
const hoursEl = document.getElementById("hoursCount");
const minutesEl = document.getElementById("minutesCount");
const secondsEl = document.getElementById("secondsCount");
const milestoneTextEl = document.getElementById("milestoneText");
const milestoneProgressEl = document.getElementById("milestoneProgress");

function updateLoveTimer() {
  const now = new Date();
  const diffMs = now - START_DATE;

  if (diffMs < 0) {
    // Trường hợp ngày trong tương lai (trước 20/01/2026)
    const futureDiff = Math.abs(diffMs);
    const d = Math.floor(futureDiff / (1000 * 60 * 60 * 24));
    const h = Math.floor((futureDiff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((futureDiff / (1000 * 60)) % 60);
    const s = Math.floor((futureDiff / 1000) % 60);

    daysEl.textContent = d;
    hoursEl.textContent = String(h).padStart(2, "0");
    minutesEl.textContent = String(m).padStart(2, "0");
    secondsEl.textContent = String(s).padStart(2, "0");
    if (milestoneTextEl) {
      milestoneTextEl.textContent = `Đếm ngược ${d} ngày tới ngày 20/01/2026!`;
      milestoneProgressEl.style.width = "100%";
    }
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalDays = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = totalDays;
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");

  // Tính cột mốc tiếp theo
  const milestones = [100, 200, 365, 500, 730, 1000, 1500, 2000];
  let nextMilestone = milestones.find(m => m > totalDays);
  if (!nextMilestone) nextMilestone = totalDays + 100;

  const prevMilestone = milestones.slice().reverse().find(m => m <= totalDays) || 0;
  const progressPercent = Math.min(100, Math.max(5, ((totalDays - prevMilestone) / (nextMilestone - prevMilestone)) * 100));

  const daysLeft = nextMilestone - totalDays;
  if (milestoneTextEl) {
    milestoneTextEl.textContent = `Chạm mốc ${nextMilestone} ngày (còn ${daysLeft} ngày nữa) 💖`;
    milestoneProgressEl.style.width = `${progressPercent}%`;
  }
}

setInterval(updateLoveTimer, 1000);
updateLoveTimer();

/* ===================================================================
  3. NHẠC MP3 & WEB AUDIO API CHO CHUÔNG MỞ THƯ
   =================================================================== */
let audioCtx = null;
let isPlayingMusic = false;
const musicBtn = document.getElementById("musicToggle");
const loveMusic = document.getElementById("loveMusic");

function playMelodyNote(freq, timeOffset, duration = 1.6) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  // Dùng sóng Sine và Triangle tạo tiếng đàn piano điện / music box êm dịu
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime + timeOffset);

  gain.gain.setValueAtTime(0.001, audioCtx.currentTime + timeOffset);
  gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + timeOffset + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + timeOffset + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(audioCtx.currentTime + timeOffset);
  osc.stop(audioCtx.currentTime + timeOffset + duration);
}

function playMagicalChime() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();

  // Chuỗi nốt lấp lánh khi mở phong bì
  const chimeNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  chimeNotes.forEach((f, i) => {
    playMelodyNote(f, i * 0.1, 1.5);
  });
}

async function toggleMusic() {
  if (!loveMusic || !musicBtn) return;
  if (isPlayingMusic) {
    loveMusic.pause();
    isPlayingMusic = false;
    musicBtn.classList.remove("playing");
    musicBtn.querySelector(".btn-text").textContent = "Giai Điệu";
    musicBtn.setAttribute("aria-pressed", "false");
    return;
  }

  try {
    loveMusic.volume = 0.55;
    await loveMusic.play();
    isPlayingMusic = true;
    musicBtn.classList.add("playing");
    musicBtn.querySelector(".btn-text").textContent = "Đang Phát 🎵";
    musicBtn.setAttribute("aria-pressed", "true");
  } catch (error) {
    isPlayingMusic = false;
    musicBtn.classList.remove("playing");
    musicBtn.querySelector(".btn-text").textContent = "Thử lại 🎵";
    musicBtn.title = "Không tải được nhạc. Hãy kiểm tra kết nối mạng rồi thử lại.";
    musicBtn.setAttribute("aria-pressed", "false");
  }
}

if (musicBtn) {
  musicBtn.addEventListener("click", toggleMusic);
}

/* ===================================================================
   4. PHONG BÌ 3D & HIỆU ỨNG MỞ BỨC THƯ TÌNH
   =================================================================== */
const envelope = document.getElementById("envelopeWrapper");
const letterCard = document.getElementById("letterCard");
const tapGuide = document.getElementById("tapGuide");
const letterContentEl = document.getElementById("letterContent");
const quillPen = document.getElementById("quillPen");
const signatureEl = document.getElementById("letterSignature");
let isEnvelopeOpened = false;
let typingTimer = null;

function handleOpenEnvelope() {
  if (isEnvelopeOpened) {
    letterCard.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  isEnvelopeOpened = true;
  playMagicalChime();

  // Nổ pháo hoa trái tim & cánh hoa
  burstParticles(25);

  envelope.classList.add("open");
  envelope.setAttribute("aria-expanded", "true");
  tapGuide.innerHTML = `<span class="guide-hand">💖</span> <span class="guide-text">Lá thư tình đang được hé lộ...</span>`;

  setTimeout(() => {
    letterCard.classList.add("visible");
    setTimeout(() => {
      letterCard.scrollIntoView({ behavior: "smooth", block: "start" });
      startWritingLetter();
    }, 450);
  }, 700);
}

if (envelope) {
  envelope.addEventListener("click", handleOpenEnvelope);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpenEnvelope();
    }
  });
}

/* ===================================================================
   5. HIỆU ỨNG BÚT VIẾT THƯ PHÁP DẠ QUANG (TYPEWRITER ENGINE)
   =================================================================== */
function startWritingLetter() {
  if (typingTimer) clearInterval(typingTimer);

  letterContentEl.textContent = "";
  letterContentEl.classList.remove("done");
  signatureEl.classList.remove("show");
  quillPen.classList.add("writing");

  let charIndex = 0;
  const speed = 25; // tốc độ gõ chữ mượt mà

  typingTimer = setInterval(() => {
    letterContentEl.textContent = LOVE_LETTER.slice(0, charIndex + 1);
    charIndex++;

    // Cho bút di chuyển mềm mại theo dòng văn bản
    const approxLines = Math.floor(charIndex / 48);
    quillPen.style.top = `${Math.min(approxLines * 26 + 10, 260)}px`;

    // Tạo chút bụi hạt lấp lánh tại đầu bút khi viết
    if (charIndex % 35 === 0) {
      const rect = quillPen.getBoundingClientRect();
      createCursorSparkle(rect.left + 10, rect.top + 10);
    }

    if (charIndex >= LOVE_LETTER.length) {
      clearInterval(typingTimer);
      typingTimer = null;
      letterContentEl.classList.add("done");
      quillPen.classList.remove("writing");
      signatureEl.classList.add("show");
      burstParticles(16);
    }
  }, speed);
}

// Nút đọc lại từ đầu
const rewriteBtn = document.getElementById("rewriteBtn");
if (rewriteBtn) {
  rewriteBtn.addEventListener("click", () => {
    startWritingLetter();
    letterCard.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// Nút gửi ngàn nụ hôn
const loveBurstBtn = document.getElementById("loveBurstBtn");
if (loveBurstBtn) {
  loveBurstBtn.addEventListener("click", () => {
    burstParticles(35);
  });
}

// Nút cuộn xuống gửi điều ước
const wishScrollBtn = document.getElementById("wishScrollBtn");
if (wishScrollBtn) {
  wishScrollBtn.addEventListener("click", () => {
    document.getElementById("wishSection").scrollIntoView({ behavior: "smooth" });
  });
}

/* ===================================================================
   6. MƯA HOA HỒNG & TRÁI TIM HUYỀN ẢO (PARTICLE RAIN)
   =================================================================== */
const petalRainBtn = document.getElementById("petalRainBtn");
if (petalRainBtn) {
  petalRainBtn.addEventListener("click", () => {
    burstParticles(30);
  });
}

function burstParticles(count = 20) {
  const icons = ["🌸", "🌹", "💖", "💕", "✨", "🌺", "❤️", "🌷", "💗"];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const p = document.createElement("div");
      p.className = "magic-particle";
      p.textContent = icons[Math.floor(Math.random() * icons.length)];
      p.style.left = `${Math.random() * 94 + 3}vw`;
      p.style.bottom = "-40px";
      p.style.fontSize = `${Math.random() * 20 + 18}px`;
      p.style.animationDuration = `${Math.random() * 2.5 + 3.2}s`;
      document.body.appendChild(p);

      setTimeout(() => p.remove(), 6000);
    }, i * 70);
  }
}

/* ===================================================================
   7. TÍCH HỢP PYTHON BACKEND API (WISHES & QUOTES & STATUS)
   =================================================================== */
const wishesListEl = document.getElementById("wishesList");
const wishForm = document.getElementById("wishForm");
const senderInput = document.getElementById("senderInput");
const wishInput = document.getElementById("wishInput");
const wishStatusEl = document.getElementById("wishStatus");
const sendWishBtn = document.getElementById("sendWishBtn");
const quoteTextEl = document.getElementById("quoteText");
// Paste the Formspree form URL here, for example: https://formspree.io/f/abcdefgh
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvkzrqpb";

function setWishStatus(message, state = "") {
  if (!wishStatusEl) return;
  wishStatusEl.textContent = message;
  wishStatusEl.className = `wish-status${state ? ` ${state}` : ""}`;
}

// Tải danh sách từ Python khi chạy cục bộ; GitHub Pages không có API này.
async function loadWishes() {
  try {
    const res = await fetch("/api/wishes");
    if (!res.ok) throw new Error("API not available");
    const wishes = await res.json();
    renderWishes(wishes);
  } catch (err) {
    renderWishes([]);
  }
}

function renderWishes(wishes) {
  if (!wishesListEl) return;
  if (!wishes || wishes.length === 0) {
    wishesListEl.innerHTML = `<div class="loading-wishes">Lời nhắn sẽ được gửi riêng cho anh và không hiển thị công khai ở đây.</div>`;
    return;
  }

  wishesListEl.innerHTML = wishes.map(w => `
    <div class="wish-item">
      <div class="wish-meta">
        <span class="wish-author">${escapeHtml(w.sender)}</span>
        <span class="wish-time">${escapeHtml(w.timestamp || "")}</span>
      </div>
      <div class="wish-body">${escapeHtml(w.content)}</div>
    </div>
  `).join("");
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Xử lý gửi điều ước
if (wishForm) {
  wishForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const sender = senderInput.value.trim() || "Vợ yêu";
    const content = wishInput.value.trim();

    if (!content) {
      alert("Vợ hãy nhập một lời nhắn hoặc điều ước nhé! 💖");
      return;
    }

    // Hiệu ứng phóng sao băng lên trời
    createShootingStar();
    burstParticles(15);

    if (sendWishBtn) sendWishBtn.disabled = true;
    setWishStatus("Đang gửi lời nhắn...", "pending");

    try {
      let savedToPython = false;
      try {
        const res = await fetch("/api/wishes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sender, content })
        });
        if (res.ok) {
          const data = await res.json();
          renderWishes(data.wishes);
          savedToPython = true;
        }
      } catch (err) {}

      if (savedToPython) {
        wishInput.value = "";
        setWishStatus("Lời nhắn đã được lưu trên máy chủ.", "success");
        return;
      }

      if (!FORMSPREE_ENDPOINT) {
        setWishStatus("Lời nhắn chưa được gửi. Anh cần kết nối Formspree để nhận lời nhắn từ trang GitHub.", "error");
        return;
      }

      const formData = new FormData();
      formData.set("name", sender);
      formData.set("message", content);
      formData.set("_subject", "Lời nhắn mới từ trang tình yêu");

      const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData
        });
      if (!res.ok) throw new Error("Formspree submission failed");
      wishInput.value = "";
      setWishStatus("Lời nhắn đã được gửi riêng đến anh. 💌", "success");
    } catch (err) {
      setWishStatus("Chưa gửi được lời nhắn. Em thử lại sau nhé.", "error");
    } finally {
      if (sendWishBtn) sendWishBtn.disabled = false;
    }
  });
}

// Tải danh ngôn tình yêu
async function loadRomanticQuotes() {
  const defaultQuotes = [
    "“Nếu như có một tỷ người trên thế giới yêu em, anh sẽ là một trong số đó. Nếu chỉ còn một người yêu em, thì người đó chính là anh.”",
    "“Khoảng cách địa lý chỉ thử thách lòng kiên nhẫn, chứ chẳng thể nào làm giảm đi tình yêu anh dành cho vợ.”",
    "“Cảm ơn định mệnh đã mang em đến bên đời anh vào ngày 20/01/2026. Từng ngày bên em là từng ngày ngập tràn phép màu.”",
    "“Trong mắt anh, thế giới rộng lớn vô cùng, nhưng điều rực rỡ và quý giá nhất chỉ gói gọn trong nụ cười của vợ.”"
  ];

  try {
    const res = await fetch("/api/quotes");
    if (res.ok) {
      const quotes = await res.json();
      if (quotes && quotes.length > 0 && quoteTextEl) {
        quoteTextEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
        return;
      }
    }
  } catch (err) {
    // Không có kết nối API, dùng danh sách mặc định
  }

  if (quoteTextEl) {
    quoteTextEl.textContent = defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)];
  }
}

// Khởi chạy khi tài liệu tải xong
document.addEventListener("DOMContentLoaded", () => {
  loadWishes();
  loadRomanticQuotes();
});

