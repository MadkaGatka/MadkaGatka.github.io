const
      lvl_0 = {
            "mógł": "mug",
            "ó": "u",
            "lub": "lup",
            "dst": "ct",
            "ę ": "e ",
            "łdr": "rdł",
            "łąk": "łonk",
            "mąk": "monk",
            "po co": "na ciul",
            "ń": "ni",
            "chrzciny": "kściny"
      },
      lvl_1 = {
            "ż": "z",
            "łąc": "łonc",
            "ąd": 'ont',
            "po": "po ",
            "bez": "bes",
            "sobie": "se",
            "ch": "h",
            "mnie": "mje",
            "wstrząsnęło": "fszczonsło",
            "wieczność": "wietrznosc",
            "wiecznosc": "wietrznosc"
      },
      lvl_2 = {
            "wtedy": "ftedy",
            "cj": "ci",
            "dla": "dla ",
            "rz": "sz",
            "ł": "l",
            "mąż": "monsz",
            "kiedykolwiek": "kiedy kolwiek",
            " tez ": " tesz ",
            "czekolade": "czyczekolatke",
            "czekoladki": "czyczekolatki",
            "czekolada": "czyczekolatka",
            "trz": "cz"
      },
      lvl_3 = {
            "nie": "ni",
            "em": "ę",
            "ię": "ien",
            "br": "rb",
            "ie": "ei",
            "ą": "om",
            "pić": "hlac",
            "chuj": "hój",
            "konkubent": "kąłkubent"
      },
      lvl_4 = {
            "co": "co kurwa",
            ",": " kurwa",
            "dzeicko": "bombelek",
            "dzeici": "kaszojady",
            "św": "śf",
            "sz": "sh",
            "\\.": "",
            "to to nic": "to to chuj"
      }

let toReplace = lvl_0
const diffLevelsObj = [lvl_0, lvl_1, lvl_2, lvl_3, lvl_4]

const handleTranslate = () => {
      if (translate.value.length < 10) return false

      let str = translate.value
      Object.entries(toReplace).forEach(([key, value]) => {
            const regex = new RegExp(key, "gi");
            str = str.replace(regex, value)
      })
      translated.value = str
      return translated.value === str ? true : false
}

const indicateSuccessOrFail = (e, successOrFail, message) => {
      const prevTextContent = e.target.textContent
      e.target.disabled = true
      e.target.textContent = message
      e.target.style.backgroundColor = successOrFail ? "#66CD00" : "#ff0033"
      setTimeout(() => {
            e.target.textContent = prevTextContent
            e.target.disabled = false
            e.target.style.backgroundColor = ""
      }, successOrFail ? 1000 : 2000)
}

const handleCopyToClipboard = e => {
      if (translated.value.length > 6) {

            translated.select();
            translated.setSelectionRange(0, translated.value.length);

            try {
                  document.execCommand('copy');
                  indicateSuccessOrFail(e, true, `skopiowano... ${String.fromCodePoint(128520)}`)
                  translated.blur();
            } catch (err) {
                  indicateSuccessOrFail(e, false, `ups... coś poszło nie tak ${String.fromCodePoint(128557)}, ${err}`)
            }
      } else {
            indicateSuccessOrFail(e, false, `ups... ${String.fromCodePoint(128557)} min. 6 znaków`)
      }
}

const handleMadkaInit = e => {
      if (handleTranslate()) {
            indicateSuccessOrFail(e, true, `tłumaczenie... ${String.fromCodePoint(128519)}`)
            hideHelper()
      } else {
            indicateSuccessOrFail(e, false, `ups... coś poszło nie tak ${String.fromCodePoint(128557)} min. 10 znaków`)
      }
}

const handleLvlChange = () => {
      const level = [],
            diffLevels = [
                  "latwy",
                  "500+",
                  "uśmieh bombelka",
                  "madka po 3 CC",
                  "sytuacia kauowa"
            ]

      lvl.textContent = diffLevels[diff_lvl.value]
      for (let i = 0; i <= diff_lvl.value; i++) {
            level.push(diffLevelsObj[i])
            toReplace = Object.assign({}, ...[...level])
      }
      hideHelper()
}

const hideHelper = () => {
      document.querySelector(".change_level_info ").style.display = "none"
}

copyToClipboard.addEventListener("click", e => handleCopyToClipboard(e), true)
translate__btn.addEventListener("click", e => handleMadkaInit(e))
diff_lvl.addEventListener("input", handleLvlChange)