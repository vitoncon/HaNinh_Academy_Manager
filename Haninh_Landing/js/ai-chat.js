document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.getElementById("ai-chat-button");
  const popup = document.getElementById("ai-chat-popup");
  const body = document.getElementById("ai-chat-body");
  const input = document.getElementById("ai-chat-input");
  const send = document.getElementById("ai-chat-send");
  const header = document.getElementById("ai-chat-header");

  if (!trigger || !popup || !body || !input || !send || !header) {
    return;
  }

  const CHAT_STORAGE_KEY = "ai_chat_history";
/// Lưu lịch sử chat vào localStorage
function saveMessage(text, type, time) {
  const history = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || "[]");

  history.push({
    text: text,
    type: type,
    time: time,
  });

  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));
}
// Thêm tin nhắn vào giao diện và lưu vào lịch sử
function addMessage(text, type) {
  const node = document.createElement("div");
  node.className = "ai-chat-message " + type;

  const time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

  const content = type === "bot" ? marked.parse(text) : text;

  node.innerHTML = `
    <div class="ai-msg-text">${content}</div>
    <div class="ai-msg-time">${time}</div>
  `;

  body.appendChild(node);
  body.scrollTop = body.scrollHeight;

  saveMessage(text, type, time); // ✔ truyền time
}
//  Tải lịch sử chat từ localStorage và hiển thị lên giao diện
function loadChatHistory() {
  body.innerHTML = "";

  const history = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || "[]");

  history.forEach(function (msg) {
    const node = document.createElement("div");
    node.className = "ai-chat-message " + msg.type;

    const content =
      msg.type === "bot"
        ? marked.parse(msg.text)
        : msg.text;

    node.innerHTML = `
      <div class="ai-msg-text">${content}</div>
      <div class="ai-msg-time">${msg.time || ""}</div>
    `;

    body.appendChild(node);
  });

  body.scrollTop = body.scrollHeight;
}
// Gửi câu hỏi đến API chatbot và nhận câu trả lời
  async function askAI(question) {
    if (!question || question.trim().length === 0) {
      return "Vui lòng nhập câu hỏi.";
    }

    try {
      // Lấy lịch sử chat từ localStorage để gửi kèm làm context (memory)
      const rawHistory = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || "[]");
      const mappedHistory = rawHistory.map(msg => ({
        role: msg.type === "bot" ? "assistant" : "user",
        content: msg.text
      }));

      const response = await fetch("http://localhost:10093/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          question: question,
          history: mappedHistory
        }),
      });

      if (!response.ok) {
        throw new Error("API chatbot error");
      }

      const data = await response.json();
      return data.answer || "Xin lỗi, tôi chưa có câu trả lời.";
    } catch (err) {
      console.error("askAI error:", err);
      return "Xin lỗi, hiện tại chatbot không hoạt động.";
    }
  }
// Xử lý sự kiện gửi câu hỏi khi nhấn nút hoặc phím Enter
async function sendQuestion() {
  const text = (input.value || "").trim();
  if (!text) return;

  // hiển thị câu hỏi người dùng
  addMessage(text, "user");
  input.value = "";

  // tạo typing animation
  const typing = document.createElement("div");
  typing.className = "ai-chat-message bot";
  typing.innerHTML =
    '<div class="ai-typing"><span></span><span></span><span></span></div>';

  body.appendChild(typing);
  body.scrollTop = body.scrollHeight;

  try {
    // gọi AI
    const answer = await askAI(text);

    // delay cho tự nhiên
    await new Promise((resolve) => setTimeout(resolve, 800));

    // xóa typing
    typing.remove();

    // hiệu ứng gõ chữ
    const node = document.createElement("div");
    node.className = "ai-chat-message bot";
    body.appendChild(node);

    let i = 0;

    const interval = setInterval(() => {
      node.innerHTML = `
        <div class="ai-msg-text">
        ${marked.parse(answer.substring(0, i))}
        </div>
        `;
      body.scrollTop = body.scrollHeight;
      i++;

      if (i >= answer.length) {
        clearInterval(interval);
        saveMessage(answer, "bot");
      }
    }, 15);

  } catch (err) {
    typing.remove();
    addMessage("Có lỗi xảy ra. Vui lòng thử lại.", "bot");
  }
}
// Thêm các gợi ý câu hỏi nhanh để người dùng dễ dàng tương tác
  function addSuggestions(options) {
    const wrap = document.createElement("div");
    wrap.className = "ai-suggestions";

    options.forEach(function (text) {
      const btn = document.createElement("button");
      btn.className = "ai-suggestion-btn";
      btn.textContent = text;

      btn.onclick = async function () {
        addMessage(text, "user");
        wrap.remove();

        const answer = await askAI("Tôi muốn học " + text);
        addMessage(answer, "bot");
      };

      wrap.appendChild(btn);
    });

    body.appendChild(wrap);
  }

  send.addEventListener("click", sendQuestion);

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendQuestion();
    }
  });
// Xử lý sự kiện kéo thả cho nút trigger
    const clearBtn = document.getElementById("ai-chat-clear");

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        localStorage.removeItem("ai_chat_history");
        document.getElementById("ai-chat-body").innerHTML = "";
      });
    }
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let clicked = false;

  trigger.addEventListener("pointerdown", function (event) {
    isDragging = true;
    clicked = false;
    trigger.setPointerCapture(event.pointerId);

    const rect = trigger.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
  });

  trigger.addEventListener("pointermove", function (event) {
    if (!isDragging) return;

    clicked = true;

    let left = event.clientX - offsetX;
    let top = event.clientY - offsetY;

    const maxLeft = window.innerWidth - trigger.offsetWidth - 10;
    const maxTop = window.innerHeight - trigger.offsetHeight - 10;

    left = Math.max(10, Math.min(maxLeft, left));
    top = Math.max(10, Math.min(maxTop, top));

    trigger.style.left = left + "px";
    trigger.style.top = top + "px";
    trigger.style.right = "auto";
    trigger.style.bottom = "auto";
  });

  trigger.addEventListener("pointerup", function (event) {
    isDragging = false;
    trigger.releasePointerCapture(event.pointerId);
  });

trigger.addEventListener("click", function (event) {
  if (clicked) {
    clicked = false;
    return;
  }

  event.preventDefault();

  if (popup.classList.contains("ai-chat-hidden")) {
    popup.classList.remove("ai-chat-hidden");
    popup.setAttribute("aria-hidden", "false");

    const history = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || "[]");

    // load lịch sử
    if (history.length > 0) {
      loadChatHistory();

      // kiểm tra có câu hỏi của user chưa
      const hasUserMessage = history.some(msg => msg.type === "user");

      if (!hasUserMessage) {
        addSuggestions([
          "Khóa tiếng Anh giao tiếp",
          "Học tiếng Trung cho người mới bắt đầu",
          "Khóa tiếng Hàn học trong bao lâu"
        ]);
      }
    }

    // nếu chưa có lịch sử thì hiển thị lời chào
    if (history.length === 0) {

      addMessage(
        "Xin chào! Tôi là AI tư vấn của Trung tâm Ngoại ngữ Hà Ninh.",
        "bot"
      );

      addMessage(
        "Tôi có thể giúp bạn tìm khóa học phù hợp. Bạn muốn học ngôn ngữ nào?",
        "bot"
      );

      addSuggestions([
        "Khóa tiếng Anh giao tiếp",
        "Học tiếng Trung cho người mới bắt đầu",
        "Khóa tiếng Hàn học trong bao lâu"
      ]);
    }

    input.focus();

  } else {
    popup.classList.add("ai-chat-hidden");
    popup.setAttribute("aria-hidden", "true");
  }
});
});