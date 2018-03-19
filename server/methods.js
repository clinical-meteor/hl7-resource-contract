Meteor.methods({
    initializeContract(){
        var newContract = {
            "resourceType": "Contract",
            "id": "C-2121",
            "meta": {
              "versionId": "1",
              "lastUpdated": "2016-07-19T18:18:42.108-04:00"
            },
            "text": {
              "status": "generated",
              "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: C-2121</p><p><b>meta</b>: </p><p><b>issued</b>: 01/11/2031 9:18:27 PM</p><p><b>subject</b>: <a>Patient/f201</a></p><p><b>type</b>: Opt-in consent directive <span>(Details : {http://org.mdhhs.fhir.consentdirective-type code 'OPTIN' = 'OPTIN)</span></p><p><b>subType</b>: Michigan MDHHS-5515 Consent to Share Behavioral Health Information for Care Coordination Purposes <span>(Details : {http://hl7.org/fhir/consentcategorycodes code 'MDHHS-5515' = 'Michigan MDHHS-5515 Consent to Share Behavioral Health Information for Care Coordination Purposes', given as 'Michigan MDHHS-5515 Consent to Share Behavioral Health Information for Care Coordination Purposes'})</span></p><p><b>securityLabel</b>: Restricted (Details: http://hl7.org/fhir/v3/Confidentiality code R = 'restricted', stated as 'Restricted'), substance abuse information sensitivity (Details: http://hl7.org/fhir/v3/ActCode code ETH = 'substance abuse information sensitivity', stated as 'substance abuse information sensitivity'), 42 CFR Part2 (Details: http://hl7.org/fhir/v3/ActCode code 42CFRPart2 = '42 CFR Part2', stated as 'null'), treatment (Details: http://hl7.org/fhir/v3/ActReason code TREAT = 'treatment', stated as 'treatment'), healthcare payment (Details: http://hl7.org/fhir/v3/ActReason code HPAYMT = 'healthcare payment', stated as 'healthcare payment'), healthcare operations (Details: http://hl7.org/fhir/v3/ActReason code HOPERAT = 'healthcare operations', stated as 'healthcare operations'), persist security label (Details: http://hl7.org/fhir/v3/ActCode code PERSISTLABEL = 'persist security label', stated as 'persist security label'), privacy mark (Details: http://hl7.org/fhir/v3/ActCode code PRIVMARK = 'privacy mark', stated as 'privacy mark'), no redisclosure without consent directive (Details: http://hl7.org/fhir/v3/ActCode code NORDSCLCD = 'no redisclosure without consent directive', stated as 'no redisclosure without consent directive')</p><blockquote><p><b>agent</b></p><p><b>actor</b>: <a>VA Ann Arbor Healthcare System</a></p><p><b>role</b>: Recipient of restricted health information <span>(Details : {http://org.mdhhs.fhir.consent-actor-type code 'IR' = 'IR', given as 'Recipient'})</span></p></blockquote><blockquote><p><b>agent</b></p><p><b>actor</b>: <a>Community Mental Health Clinic</a></p><p><b>role</b>: Sender of restricted health information <span>(Details : {http://org.mdhhs.fhir.consent-actor-type code 'IS' = 'IS', given as 'Sender'})</span></p></blockquote><h3>Signers</h3><table><tr><td>-</td><td><b>Type</b></td><td><b>Party</b></td><td><b>Signature</b></td></tr><tr><td>*</td><td>SELF (Details: http://org.mdhhs.fhir.consent-signer-type code SELF = 'SELF', stated as 'null')</td><td><a>Alice Recruit</a></td><td/></tr></table><h3>Legals</h3><table><tr><td>-</td><td><b>Content[x]</b></td></tr><tr><td>*</td><td/></tr></table></div>"
            },
            "issued": "2031-11-01T21:18:27-04:00",
            "subject": [
              {
                "reference": "Patient/f201"
              }
            ],
            "type": {
              "coding": [
                {
                  "system": "http://org.mdhhs.fhir.consentdirective-type",
                  "code": "OPTIN"
                }
              ],
              "text": "Opt-in consent directive"
            },
            "subType": [
              {
                "coding": [
                  {
                    "system": "http://hl7.org/fhir/consentcategorycodes",
                    "code": "MDHHS-5515",
                    "display": "Consent to Share Behavioral Health Information"                  }
                ]
              }
            ],
            "securityLabel": [
              {
                "system": "http://hl7.org/fhir/v3/Confidentiality",
                "code": "R",
                "display": "Restricted"
              },
              {
                "system": "http://hl7.org/fhir/v3/ActCode",
                "code": "ETH",
                "display": "substance abuse information sensitivity"
              },
              {
                "system": "http://hl7.org/fhir/v3/ActCode",
                "code": "42CFRPart2"
              },
              {
                "system": "http://hl7.org/fhir/v3/ActReason",
                "code": "TREAT",
                "display": "treatment"
              },
              {
                "system": "http://hl7.org/fhir/v3/ActReason",
                "code": "HPAYMT",
                "display": "healthcare payment"
              },
              {
                "system": "http://hl7.org/fhir/v3/ActReason",
                "code": "HOPERAT",
                "display": "healthcare operations"
              },
              {
                "system": "http://hl7.org/fhir/v3/ActCode",
                "code": "PERSISTLABEL",
                "display": "persist security label"
              },
              {
                "system": "http://hl7.org/fhir/v3/ActCode",
                "code": "PRIVMARK",
                "display": "privacy mark"
              },
              {
                "system": "http://hl7.org/fhir/v3/ActCode",
                "code": "NORDSCLCD",
                "display": "no redisclosure without consent directive"
              }
            ],
            "agent": [
              {
                "actor": {
                  "reference": "Organization/f001",
                  "display": "VA Ann Arbor Healthcare System"
                },
                "role": [
                  {
                    "coding": [
                      {
                        "system": "http://org.mdhhs.fhir.consent-actor-type",
                        "code": "IR",
                        "display": "Recipient"
                      }
                    ],
                    "text": "Recipient of restricted health information"
                  }
                ]
              },
              {
                "actor": {
                  "reference": "Organization/2",
                  "display": "Community Mental Health Clinic"
                },
                "role": [
                  {
                    "coding": [
                      {
                        "system": "http://org.mdhhs.fhir.consent-actor-type",
                        "code": "IS",
                        "display": "Sender"
                      }
                    ],
                    "text": "Sender of restricted health information"
                  }
                ]
              }
            ],
            "signer": [
              {
                "type": {
                  "system": "http://org.mdhhs.fhir.consent-signer-type",
                  "code": "SELF"
                },
                "party": {
                  "reference": "Patient/f201",
                  "display": "Alice Recruit"
                },
                "signature": [
                  {
                    "type": [
                      {
                        "system": "urn:iso-astm:E1762-95:2013",
                        "code": "1.2.840.10065.1.12.1.1"
                      }
                    ],
                    "when": "2017-02-08T10:57:34+01:00",
                    "whoReference": {
                      "reference": "Patient/f201"
                    }
                  }
                ]
              }
            ],
            "legal": [
              {
                "contentAttachment": {
                  "contentType": "application/pdf",
                  "language": "en-US",
                  "url": "http://org.mihin.ecms/ConsentDirective-2121",
                  "title": "MDHHS-5515 Consent To Share Your Health Information"
                }
              }
            ]
          };

        Contracts.insert(newContract);
    }
})