/* ── VIEWS ── */
function showView(id) {
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  document
    .getElementById(id === "landing" ? "viewLanding" : "viewPricing")
    .classList.add("active");
  window.scrollTo(0, 0);
}

/* ── TABS ── */
function switchTab(tab) {
  document
    .getElementById("tabLogin")
    .classList.toggle("active", tab === "login");
  document
    .getElementById("tabSignup")
    .classList.toggle("active", tab === "signup");
  document.getElementById("formLogin").style.display =
    tab === "login" ? "block" : "none";
  document.getElementById("formSignup").style.display =
    tab === "signup" ? "block" : "none";
}

/* ── LOGIN ── */
function handleLogin() {
  showView("pricing");
}

// ── Registration ──────────────────────────────────────────
async function handleSignup(isResend = false) {
  const fullname = document.getElementById("su_fullname").value.trim();
  const email = document.getElementById("su_email").value.trim();
  const organisation = document.getElementById("su_organisation").value.trim();
  const role = document.getElementById("su_role").value;
  const password = document.getElementById("su_password").value;
  const confirmPassword = document.getElementById("su_confirmPassword").value;

  // Client-side guard
  if (
    !fullname ||
    !email ||
    !organisation ||
    !role ||
    !password ||
    !confirmPassword
  ) {
    return showToast("Please fill in all fields.", "error");
  }
  if (password !== confirmPassword) {
    return showToast("Passwords do not match.", "error");
  }
  if (password.length < 8) {
    return showToast("Password must be at least 8 characters.", "error");
  }

  const btn = document.getElementById("signupBtn");
  btn.disabled = true;
  btn.textContent = isResend ? "Resending OTP…" : "Creating account…";

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname,
        email,
        organisation,
        role,
        password,
        confirmPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.error || "Registration failed.", "error");
      return;
    }

    // Show OTP step
    document.getElementById("otpEmailDisplay").textContent = email;
    document.getElementById("signupStep1").style.display = "none";
    document.getElementById("signupStep2").style.display = "block";
    showToast(
      isResend ? "OTP resent!" : "OTP sent! Check your email.",
      "success",
    );
  } catch (err) {
    showToast("Network error. Please try again.", "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Create Account & Continue →";
  }
}

// ── OTP Verification ──────────────────────────────────────
async function handleVerifyOTP() {
  const email = document.getElementById("su_email").value.trim();
  const otp = document.getElementById("su_otp").value.trim();

  if (!otp || otp.length !== 6) {
    return showToast("Please enter the 6-digit OTP.", "error");
  }

  const btn = document.getElementById("verifyOtpBtn");
  btn.disabled = true;
  btn.textContent = "Verifying…";

  try {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.error || "Verification failed.", "error");
      return;
    }

    showToast("Registration complete! Redirecting…", "success");
    setTimeout(() => {
      showView("landing");
      switchTab("login");
    }, 1500);
  } catch (err) {
    showToast("Network error. Please try again.", "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Verify & Complete Registration →";
  }
}

/* ── PURCHASE MODAL ── */
const PLAN_AMOUNTS = {
  "Self Assessment": 5,
  "Guided Assessment": 10,
  "Expert Assessment": 50000,
};

async function handlePurchase(plan, price) {
  // Still show modal for UX, but "Pay" button now calls initRazorpay
  document.getElementById("purchasePlanName").textContent = plan;
  document.getElementById("purchasePrice").textContent = price;
  document.getElementById("purchaseBackdrop").style.display = "flex";

  // Store plan for pay button
  document.getElementById("purchaseBackdrop").dataset.plan = plan;
}

async function initRazorpay() {
  const plan = document.getElementById("purchaseBackdrop").dataset.plan;
  const amount = PLAN_AMOUNTS[plan];

  const res = await fetch("/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ amount, plan }),
  });

  const { orderId, currency } = await res.json();

  const options = {
    key: "rzp_live_SXQNNs4va5ojYK",
    amount: amount * 100,
    currency,
    name: "trcelabs",
    description: `${plan} — DPDPA Assessment`,
    order_id: orderId,
    handler: async function (response) {
      try {
        const verify = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            plan,
          }),
        });

        // Log the raw response for debugging
        const verifyData = await verify.json();
        console.log("[VERIFY RESPONSE]", verify.status, verifyData);

        if (verify.ok) {
          document.getElementById("purchaseBackdrop").style.display = "none";
          showSuccessModal(plan, `₹${amount.toLocaleString("en-IN")}`);
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 3000);
        } else {
          // Show the actual error from server
          const errMsg =
            verifyData?.error ||
            verifyData?.message ||
            `Verification failed (${verify.status})`;
          console.error("[VERIFY FAILED]", errMsg);
          showToast(`Payment verification failed: ${errMsg}`, "error");
        }
      } catch (err) {
        console.error("[VERIFY ERROR]", err);
        showToast(
          "Network error during verification. Contact support.",
          "error",
        );
      }
    },
    prefill: {
      email: document.getElementById("userEmail")?.textContent || "",
    },
    theme: { color: "#00E5FF" },
  };

  const rzp = new Razorpay(options);
  rzp.on("payment.failed", () =>
    showToast("Payment failed. Please try again.", "error"),
  );
  rzp.open();
}

function closePurchase(e) {
  if (e.target === document.getElementById("purchaseBackdrop"))
    document.getElementById("purchaseBackdrop").style.display = "none";
}
function selPayMethod(el) {
  el.closest("div")
    .querySelectorAll("button")
    .forEach((b) => {
      b.style.borderColor = "var(--border-md)";
      b.style.background = "none";
      b.style.color = "var(--text-2)";
    });
  el.style.borderColor = "var(--cyan)";
  el.style.background = "rgba(0,229,255,0.08)";
  el.style.color = "var(--cyan)";
}
function showSuccessModal(plan, price) {
  const msgs = {
    "Self Assessment":
      "Your assessment platform is live. Log in to begin your DPDPA self-assessment questionnaire.",
    "Guided Assessment":
      "Your platform access is live. A calendar invite for your 30-min expert session will arrive within 2 hours.",
    "Expert Assessment":
      "Your account manager will contact you within 48 hours to schedule your onboarding call.",
  };
  document.getElementById("successMsg").textContent =
    msgs[plan] || msgs["Self Assessment"];

  const rows = [
    ["Plan", plan],
    ["Amount paid", price],
    ["Invoice", "GST invoice will be emailed"],
    ["Access", "Immediate · 12 months"],
  ];
  document.getElementById("successDetail").innerHTML = rows
    .map(
      (r) =>
        `<div style="display:flex;justify-content:space-between;font-size:13px;padding:5px 0;border-bottom:0.5px solid var(--border)"><span style="color:var(--text-3)">${r[0]}</span><span style="color:var(--white);font-weight:500">${r[1]}</span></div>`,
    )
    .join("");

  document.getElementById("successBackdrop").style.display = "flex";
}

/* ── KEYBOARD ── */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.getElementById("purchaseBackdrop").style.display = "none";
    document.getElementById("successBackdrop").style.display = "none";
  }
});

function showToast(message, type = "success", duration = 3500) {
  const container = document.getElementById("toastContainer");
  const icon = type === "success" ? "✅" : "❌";

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  // Trigger slide-in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add("show"));
  });

  // Slide-out then remove
  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove(), {
      once: true,
    });
  }, duration);
}

// ── Button state helpers ─────────────────────────────────────────
function setLoading(isLoading) {
  const btn = document.getElementById("loginBtn");
  if (isLoading) {
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> Signing in…`;
  } else {
    btn.disabled = false;
    btn.innerHTML = "Sign In to Dashboard →";
  }
}

function populateUserBar(user) {
  // Name
  const nameEl = document.getElementById("userName");
  if (nameEl) nameEl.textContent = user.fullname || "User";

  // Email
  const emailEl = document.getElementById("userEmail");
  if (emailEl) emailEl.textContent = user.email || "";

  // Initials
  const avatarEl = document.getElementById("userInitials");
  if (avatarEl && user.fullname) {
    const parts = user.fullname.trim().split(/\s+/);
    const initials =
      parts.length >= 2
        ? parts[0][0] + parts[parts.length - 1][0]
        : parts[0].slice(0, 2);
    avatarEl.textContent = initials.toUpperCase();
  }
}

// ── Main login handler ───────────────────────────────────────────
async function handleLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  // ── Client-side validation ──
  if (!email || !password) {
    showToast("Please enter both email and password.", "error");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Please enter a valid email address.", "error");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // ensures the HttpOnly cookie is stored
    });

    const data = await response.json();

    if (response.ok) {
      // Store user data for the pricing view
      sessionStorage.setItem("user", JSON.stringify(data.user));

      showToast("Login successful!", "success");

      setTimeout(() => {
        populateUserBar(data.user);
        showView("pricing");
      }, 1500);
    } else {
      // ── Server-side errors (400 / 401 / 403 / 500) ──
      const errorMap = {
        403: "Account not verified. Please check your email.",
        401: "Invalid email or password.",
        400: "Email and password are required.",
      };
      const msg =
        errorMap[response.status] || data.error || "Something went wrong.";
      showToast(msg, "error");
      setLoading(false);
    }
  } catch (err) {
    // ── Network / unexpected error ──
    console.error("[LOGIN]", err);
    showToast("Network error. Please try again.", "error");
    setLoading(false);
  }
}

// ── Allow Enter key to submit ────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  ["loginEmail", "loginPassword"].forEach((id) => {
    document.getElementById(id)?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleLogin();
    });
  });
});

// Call this once on page load
document.addEventListener("DOMContentLoaded", () => {
  const signOutLink = document.querySelector(".user-bar-right");
  if (signOutLink) {
    signOutLink.addEventListener("click", async (e) => {
      e.preventDefault();
      sessionStorage.removeItem("user");
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      showView("landing");
    });
  }
});



  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar')

    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(5, 5, 8, 0.8)'
      navbar.style.backdropFilter = 'blur(16px)'
      navbar.style.webkitBackdropFilter = 'blur(16px)'
      navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)'
      navbar.style.padding = '16px 0'
    } else {
      navbar.style.background = 'transparent'
      navbar.style.backdropFilter = 'none'
      navbar.style.borderBottom = '1px solid transparent'
      navbar.style.padding = '24px 0'
    }
  })

  function goBack() {
    window.history.back();
  }
