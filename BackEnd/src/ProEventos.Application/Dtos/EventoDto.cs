using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório!")]
        public string Local { get; set; }
        
        [Required(ErrorMessage = "O campo {0} é obrigatório!")]
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório!")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "O campo {0} deve conter 3 a 50 caracteres!")]
        public string Tema { get; set; }

        [Display(Name = "Qtd. Pessoas")]
        [Range(1, 120000, ErrorMessage = "{0} deve possuir um intervalo entre 1 e 120.000!")]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "Não é uma imagem válida. (gif, jpg, jpeg, bmp, png)")]
        public string ImagemURL { get; set; }

        [Display(Name = "Telefone")]
        [Required(ErrorMessage = "O campo {0} é obrigatório!")]
        [Phone(ErrorMessage = "O campo {0} está inválido!")]
        public string Telefone { get; set; }

        [Display(Name = "e-mail")] 
        [Required(ErrorMessage = "O campo {0} é obrigatório!")]
        [EmailAddress(ErrorMessage = "É necessário ser um {0} válido!")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}