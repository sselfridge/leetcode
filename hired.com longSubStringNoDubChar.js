function solutionLong(s) {
  let hash = {};
  let size = 0;
  let longest = 0;
  let doubleNumIndex = 0
  for (let i = 0; i < s.length; i++) {
    for (let j = doubleNumIndex; j < s.length; j++) {
      const letter = s[j];
        // console.log(`Letter:${letter} Size:${size}`);
      if (hash[letter] === undefined) {
        hash[letter] = i;
        size++;
      } else {
        // this letter before, reset count
        if (size > longest) {
          console.log(`longest Found on at:${i} ${letter} Longest:${size}`);
          console.log(hash);
          longest = size;
        }
        doubleNumIndex = hash[letter]
        hash = {}
        hash[letter] = i;
        size = 1;
      }
    }
  }
  return longest;
}


function solution(s) {
    let hash = {};
    let size = 0;
    let longest = 0;
    let prevDoubleIndex = 0
    for (let i = 0; i < s.length; i++) {
        const letter = s[i];
        //   console.log(`Letter:${letter} Size:${size}`);
        if (hash[letter] === undefined) {
          hash[letter] = i;
          size++;
        } else {
          // this letter before, reset count
          if (size > longest) {
            // console.log(`longest Found on at:${i} ${letter} Longest:${size}`);
            // console.log(hash);
            longest = size;
          }
          prevDoubleIndex = hash[letter]
          hash = {}
          i = prevDoubleIndex
          size = 0;

        }
      
    }
    return longest;
  }

// out = solution("abcabce")
out = solution(
  "eIKamiypfxTLxJSWnZljabIiGOdvrLVNXZSFIDGrEotVsZHLFjIoKrNXuDsrryVLufvvKVciFvbEmdRhJRdTtXklVKcXIIzxlPSyicqFATcSOpMPAPbEalFNfdvRCDyWftoARPEHitjhQAMTekJOUVHEnsbDxsgySQjAjBYtqmvlaRzDxXFtjkvSVtGWUfQuYzpWOcFLlYtszDQmuREbGPEzcMpQgiYFMputrJIBRaDmKpCumLhQEWRqYLAfZlOBQAKQuBJXaPVNJgJPmZndNaqZQELTgnmQMMIBGDQkCrgBOlqXhRHpiageThQjXqWkuOpTnKfgzgvZSpatWzgxONkHBavwtWiaEqyIKUVNlxmrROoguBFNgEYtNPZKLKWUEFTPDvyQAnuDNGzfnowfPuCsvIPXlbeyzlJJpQkbLFDMiNtCwpKHduXVAMKidSpsdtlGYrXDCybJhxtoHhfpVHROcABEVwfikviSUdbiRvQERfHyWLifhhAvGNXsOQvdTCpNiVcRlhzIMTSlsQmpuLBrLeSaavOesmWeuNdvrhkJPjDgXxtnnnkkVFwhqTQuvPxxrzgyQcURElvRZeqqiYLXHWZixgosoDSkZDHCbfgSAFxpusLDNxtVjGilOcBEdCiAeCccbCWlDFdMUlPKZYFdLbXxxtmkgYXfBTAFLwIcxrGwHFWPJzQvPWTMjrPoMSplMFkQIcNxptFFtMGWfMmhFzztfZlmPdqtRJrKOIKblDgSDMbXwjiWKlwsGHDpMGRdlMzqfexXFJtRCxElukbiRXxvMkpNTPneYRFqvVWcFyEkAgibBtZrrwPfXHHUgJqwRDjBkuBZsshKvbytbBNpnVVLdqASRThqweMsHcJtZpuawtLJIiclLJzWxrcVSQZRnceeFVtbwGdoDzxmOYVEzVDBaATSAVWMydjFaAxymNNOzMfcCYtVINcezlasEjyVQrsMDZUluXkyuyaKwjhyVbCsAsiwaBBHPiGxgiTDafEjNtfesEvAcQfOAIjpeVzWXjkALRQvscdUjtUElmzIATrLpsIBuvUczjIQjPfsnxKrECAcarwSOQQjqSPVsaPkvuUEQhtXgmepqpCYBFvLCVEfhohmeBxqwkYqwtvPeawrNOYfKQIkOXIZkLQZnWWSvQkMbMsRHoVbMeQmJmdpEbGRTsUxbVaFcMQfRoNRUXQqhzkErGdDjylURheinlDSLfGWFyiRWGZLnADiMDWxygksMQffzsHNZwZQxMnZsZPPRefWGOAORBpuLReyjOJGPWAEWkqKbJXfHhWSISnKyjLUylkbixEwKzhOTLZhTWensKNScMnkWifQRqhVoNqmdhHMvlSnnrYmYGgUCQraoOxbgZZTvPynmzhJbyvStaDSIONGrWGclPswREUAQwfWzTofmkISQortVZCoorhwFdBCEbnNdJZTgyvQnwGJpUSRrILCKQYcoRZhOnoQRjPoHztOjBFaFUkTQkKFVlPUeerAtVOdNHrjvWWNzNaDJWxoMTJmhfVSbSfeWeyUAdCERHvZweVIHTkWxzEFaZBVOUediGZFjfhNAdlcOrVQtkmlHEObhdWgtJEbaEvVrxUrSTXEZaMRZWbGmuzdvQBTCezoOmmrwtTijUOPEgtsWOyKDnCYKSrEDKOaNfxAigLBEPxvMyhveIofHXALAGDQTDYbXrGsMsksDdoyTOHpyKtmmEfYWVstwGFrAXllprIRgkmAZQKGAFrxHHEUPTenowHTWsAqRBXEsvsrcMVcdEEnLlOBEmUkkWAnIOuGBEqNkWJimTNMEYLbkWQqIlcBywLEhvCYRnaGSoGyDqRTZkrhSfUexTuHHrYUQVQcfQjMqkiOfnmYMDuTqeixhRSTnWVwopLjpwCSsjRjJVAWiBwRGhPhtWuGWXeqziVZSzsdWGxTTMbkuwbJuJpaWQxDyGkAZHqYlLphcFWctLwrFqwDMFRyQeejMNvzWTYwHlRIGDeItePOOHpKwnFRMbyhfUrnCBKYsrHGETiTAkynOyhLzNALnUFBrbfxfPBTGQLQZGYTLxuKslBmYtFtiocoieISEhWxgGuaSKbXorOyMaHxtkDmMPSqAcPnhhQCkXAnQDDssXQdeOgcOJOYQhONrnbKxtmDqLKuDmdBpwxTCRhuzFrUtgxaGVfixVyJVbDsxQGdmRFGuBaCRRFQeRzXVgNHKPYfLFLTvDFZtbiROqImqUPcFsyvNzHoLOrMCnNdjDXkiAdRPXONaXpilMCrXfBoPFzsRDBCqoxXZmUIFEwmmuRkXYBMPZQCDcwopEmRzIuljdrQmyzljIthTDDmLdYnfliuJMcdsrrvcQtfyakoElMDXnZyidnHAznxwjzKAUIFkBtdNUGVmwsPtjjSyeNPxogBQfoBVSPPVDjHwVdrnRsIMXqjnKNnXhYQwKqBxjdTQNdHwSVuGbGniwDiuzmdPJsWUeexaicofLOqEPTZVnjHvVNMlFrTKYczZnZrtXgwRZBeUvyucvNnrmZUxIJtEdVhqJsntFucfztwAFxTcjmnCxXBAYlTQqfwiTdzlcDqvGEPGCiHjwqhDvtehHahlksGuOjGTClvMLjKAJvOMSZBdzyRrCcTMoVS"
);
// outLong = solutionLong(
//   "eIKamiypfxTLxJSWnZljabIiGOdvrLVNXZSFIDGrEotVsZHLFjIoKrNXuDsrryVLufvvKVciFvbEmdRhJRdTtXklVKcXIIzxlPSyicqFATcSOpMPAPbEalFNfdvRCDyWftoARPEHitjhQAMTekJOUVHEnsbDxsgySQjAjBYtqmvlaRzDxXFtjkvSVtGWUfQuYzpWOcFLlYtszDQmuREbGPEzcMpQgiYFMputrJIBRaDmKpCumLhQEWRqYLAfZlOBQAKQuBJXaPVNJgJPmZndNaqZQELTgnmQMMIBGDQkCrgBOlqXhRHpiageThQjXqWkuOpTnKfgzgvZSpatWzgxONkHBavwtWiaEqyIKUVNlxmrROoguBFNgEYtNPZKLKWUEFTPDvyQAnuDNGzfnowfPuCsvIPXlbeyzlJJpQkbLFDMiNtCwpKHduXVAMKidSpsdtlGYrXDCybJhxtoHhfpVHROcABEVwfikviSUdbiRvQERfHyWLifhhAvGNXsOQvdTCpNiVcRlhzIMTSlsQmpuLBrLeSaavOesmWeuNdvrhkJPjDgXxtnnnkkVFwhqTQuvPxxrzgyQcURElvRZeqqiYLXHWZixgosoDSkZDHCbfgSAFxpusLDNxtVjGilOcBEdCiAeCccbCWlDFdMUlPKZYFdLbXxxtmkgYXfBTAFLwIcxrGwHFWPJzQvPWTMjrPoMSplMFkQIcNxptFFtMGWfMmhFzztfZlmPdqtRJrKOIKblDgSDMbXwjiWKlwsGHDpMGRdlMzqfexXFJtRCxElukbiRXxvMkpNTPneYRFqvVWcFyEkAgibBtZrrwPfXHHUgJqwRDjBkuBZsshKvbytbBNpnVVLdqASRThqweMsHcJtZpuawtLJIiclLJzWxrcVSQZRnceeFVtbwGdoDzxmOYVEzVDBaATSAVWMydjFaAxymNNOzMfcCYtVINcezlasEjyVQrsMDZUluXkyuyaKwjhyVbCsAsiwaBBHPiGxgiTDafEjNtfesEvAcQfOAIjpeVzWXjkALRQvscdUjtUElmzIATrLpsIBuvUczjIQjPfsnxKrECAcarwSOQQjqSPVsaPkvuUEQhtXgmepqpCYBFvLCVEfhohmeBxqwkYqwtvPeawrNOYfKQIkOXIZkLQZnWWSvQkMbMsRHoVbMeQmJmdpEbGRTsUxbVaFcMQfRoNRUXQqhzkErGdDjylURheinlDSLfGWFyiRWGZLnADiMDWxygksMQffzsHNZwZQxMnZsZPPRefWGOAORBpuLReyjOJGPWAEWkqKbJXfHhWSISnKyjLUylkbixEwKzhOTLZhTWensKNScMnkWifQRqhVoNqmdhHMvlSnnrYmYGgUCQraoOxbgZZTvPynmzhJbyvStaDSIONGrWGclPswREUAQwfWzTofmkISQortVZCoorhwFdBCEbnNdJZTgyvQnwGJpUSRrILCKQYcoRZhOnoQRjPoHztOjBFaFUkTQkKFVlPUeerAtVOdNHrjvWWNzNaDJWxoMTJmhfVSbSfeWeyUAdCERHvZweVIHTkWxzEFaZBVOUediGZFjfhNAdlcOrVQtkmlHEObhdWgtJEbaEvVrxUrSTXEZaMRZWbGmuzdvQBTCezoOmmrwtTijUOPEgtsWOyKDnCYKSrEDKOaNfxAigLBEPxvMyhveIofHXALAGDQTDYbXrGsMsksDdoyTOHpyKtmmEfYWVstwGFrAXllprIRgkmAZQKGAFrxHHEUPTenowHTWsAqRBXEsvsrcMVcdEEnLlOBEmUkkWAnIOuGBEqNkWJimTNMEYLbkWQqIlcBywLEhvCYRnaGSoGyDqRTZkrhSfUexTuHHrYUQVQcfQjMqkiOfnmYMDuTqeixhRSTnWVwopLjpwCSsjRjJVAWiBwRGhPhtWuGWXeqziVZSzsdWGxTTMbkuwbJuJpaWQxDyGkAZHqYlLphcFWctLwrFqwDMFRyQeejMNvzWTYwHlRIGDeItePOOHpKwnFRMbyhfUrnCBKYsrHGETiTAkynOyhLzNALnUFBrbfxfPBTGQLQZGYTLxuKslBmYtFtiocoieISEhWxgGuaSKbXorOyMaHxtkDmMPSqAcPnhhQCkXAnQDDssXQdeOgcOJOYQhONrnbKxtmDqLKuDmdBpwxTCRhuzFrUtgxaGVfixVyJVbDsxQGdmRFGuBaCRRFQeRzXVgNHKPYfLFLTvDFZtbiROqImqUPcFsyvNzHoLOrMCnNdjDXkiAdRPXONaXpilMCrXfBoPFzsRDBCqoxXZmUIFEwmmuRkXYBMPZQCDcwopEmRzIuljdrQmyzljIthTDDmLdYnfliuJMcdsrrvcQtfyakoElMDXnZyidnHAznxwjzKAUIFkBtdNUGVmwsPtjjSyeNPxogBQfoBVSPPVDjHwVdrnRsIMXqjnKNnXhYQwKqBxjdTQNdHwSVuGbGniwDiuzmdPJsWUeexaicofLOqEPTZVnjHvVNMlFrTKYczZnZrtXgwRZBeUvyucvNnrmZUxIJtEdVhqJsntFucfztwAFxTcjmnCxXBAYlTQqfwiTdzlcDqvGEPGCiHjwqhDvtehHahlksGuOjGTClvMLjKAJvOMSZBdzyRrCcTMoVS"
// );

console.log(out);
// console.log(outLong);
out;
