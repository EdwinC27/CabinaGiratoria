import { Component } from '@angular/core';
import { FileService } from '../FileLogoFiesta/file.service';
import { FraseService } from '../Frase/frase.service';

@Component({
  selector: 'app-menu-acciones',
  templateUrl: './menu-acciones.component.html',
  styleUrls: ['./menu-acciones.component.css']
})
export class MenuAccionesComponent {
  selectedOption: string = 'Seleccionar';
  selectedOptionDefault: string = 'Seleccionar'

  inputText: string = '';
  inputMensage: string = '';
  resultado: any;

  constructor(private fraseService: FraseService, private fileService: FileService) { }

  async seleccionarArchivo(event: any) {
    const imagen = event.target.files[0];
    const resultado = await this.convertirImagenABase64(imagen);
    this.resultado = resultado.base64
  }

  subirArchivo() {
    this.fileService.establecerFileCompartida(this.resultado);
    alert("Archivo subido exitosamente")
  }

  // función que convierte una imagen a base64
  public async convertirImagenABase64(imagen: File): Promise<{base64: string | null}> {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(imagen);
      const result = await new Promise<string | null>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => resolve(null);
      });
      return { base64: result };
    } catch (error) {
      console.error('Error al convertir imagen a base64:', error);
      return { base64: null };
    }
  }

  accion(selectedOption: string) {
    alert(selectedOption)
  }
}
