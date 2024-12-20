document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.getElementById("toggleSwitch");
  const koButton = document.getElementById("ko");
  const enButton = document.getElementById("en");
  const zhButton = document.getElementById("zh");
  const esButton = document.getElementById("es");

  // 초기 스위치 상태를 스토리지에서 가져옴
  chrome.storage.local.get(["extensionEnabled", "language"], function (result) {
    toggleSwitch.checked = result.extensionEnabled || false;
    const language = result.language || "ko";
    setActiveLanguage(language);
  });

  // 스위치가 변경될 때 상태를 저장하고 background.js에 상태 전송
  toggleSwitch.addEventListener("change", function () {
    const isEnabled = this.checked;
    chrome.storage.local.set({ extensionEnabled: isEnabled }, function () {
      console.log("Extension enabled:", isEnabled);
    });

    chrome.runtime.sendMessage({ action: "toggleExtension", isEnabled: isEnabled });
  });

  // 언어 버튼 클릭 이벤트
  koButton.addEventListener("click", function () {
    setActiveLanguage("ko");
  });

  enButton.addEventListener("click", function () {
    setActiveLanguage("en");
  });

  zhButton.addEventListener("click", function () {
    setActiveLanguage("zh");
  });

  esButton.addEventListener("click", function () { // 스페인어 버튼 클릭 이벤트 추가
    setActiveLanguage("es");
  });

  function setActiveLanguage(language) {
    koButton.classList.toggle("active", language === "ko");
    enButton.classList.toggle("active", language === "en");
    zhButton.classList.toggle("active", language === "zh");
    esButton.classList.toggle("active", language === "es"); // 스페인어 버튼 활성화 처리

    chrome.storage.local.set({ language: language }, function () {
      console.log("Language set to:", language);
    });

    // 언어 변경 메시지 전송
    chrome.storage.local.get(["extensionEnabled"], function (result) {
      if (result.extensionEnabled) {
        chrome.runtime.sendMessage({ action: "changeLanguage", language: language });
      }
    });
  }
});
